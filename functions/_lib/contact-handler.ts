// Request handling for POST /api/contact. Kept out of functions/api/contact.ts
// so tests can call it directly. Source: docs/contact-page-spec.md (Server side).
//
// Never return stack traces or provider messages. Never log message text,
// phone numbers, or email addresses.
import {
  CONTACT_LIMITS,
  validateAll,
  type ContactErrors,
} from "../../shared/contact-schema.ts";
import { sendEmail, type EmailEnv, type EmailMessage } from "./send-email.ts";

export type ContactEnv = EmailEnv & {
  TURNSTILE_SECRET_KEY?: string;
  // Set only when the production domain is known. Enables the Origin check.
  NEXT_PUBLIC_SITE_URL?: string;
};

export type ContactDeps = {
  fetch: typeof fetch;
  sendEmail: typeof sendEmail;
};

type ErrorCode = "validation" | "verification" | "server";

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const MAX_TOKEN_LENGTH = 2048;

const TOPIC_LABELS: Record<string, string> = {
  "training-topics": "Training topics",
  "live-training": "Live training",
  sessions: "Sessions",
  other: "Something else",
};

const ROLE_LABELS: Record<string, string> = {
  "agency-owner": "Agency owner or leader",
  "new-agency-owner": "New agency owner",
  consultant: "Consultant",
  freelancer: "Freelancer",
  other: "Other",
};

function json(
  body: Record<string, unknown>,
  status: number,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

function fail(status: number, code: ErrorCode, extra: Record<string, unknown> = {}) {
  return json({ ok: false, code, ...extra }, status);
}

function originAllowed(request: Request, siteUrl: string | undefined): boolean {
  const configured = siteUrl?.trim();
  if (!configured) return true; // Not set until launch: no origin check.

  let expected: string;
  try {
    expected = new URL(configured).origin;
  } catch {
    return false;
  }
  return request.headers.get("Origin") === expected;
}

async function verifyTurnstile(
  token: string,
  secret: string,
  remoteIp: string | null,
  doFetch: typeof fetch,
): Promise<"valid" | "invalid" | "unavailable"> {
  const form = new URLSearchParams({ secret, response: token });
  if (remoteIp) form.set("remoteip", remoteIp);

  try {
    const res = await doFetch(SITEVERIFY_URL, { method: "POST", body: form });
    if (!res.ok) return "unavailable";
    const data = (await res.json()) as { success?: boolean };
    return data.success === true ? "valid" : "invalid";
  } catch {
    return "unavailable";
  }
}

function buildEmail(values: Record<string, string>): EmailMessage {
  const topic = TOPIC_LABELS[values.topic] ?? values.topic;
  const role = values.role ? (ROLE_LABELS[values.role] ?? values.role) : "Not given";
  const lines = [
    `Topic: ${topic}`,
    `Role: ${role}`,
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`,
    "",
    "Message:",
    values.message,
  ];
  // The subject uses only the topic label, never visitor-typed text.
  return {
    subject: `Contact form: ${topic}`,
    text: lines.join("\n"),
    replyTo: values.email,
  };
}

export async function handleContact(
  request: Request,
  env: ContactEnv,
  deps: Partial<ContactDeps> = {},
): Promise<Response> {
  const doFetch = deps.fetch ?? fetch;
  const doSend = deps.sendEmail ?? sendEmail;

  if (request.method !== "POST") {
    return json({ ok: false, code: "validation" }, 405, { Allow: "POST" });
  }

  if (!originAllowed(request, env.NEXT_PUBLIC_SITE_URL)) {
    return fail(403, "verification");
  }

  const declared = Number(request.headers.get("Content-Length"));
  if (Number.isFinite(declared) && declared > CONTACT_LIMITS.bodyMaxBytes) {
    return fail(413, "validation");
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return fail(400, "validation");
  }
  if (new TextEncoder().encode(raw).length > CONTACT_LIMITS.bodyMaxBytes) {
    return fail(413, "validation");
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, "validation");
  }
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return fail(400, "validation");
  }
  const input = body as Record<string, unknown>;

  // Honeypot: a bot filled the hidden field. Look successful, send nothing.
  const honeypot = input.website;
  if (typeof honeypot === "string" ? honeypot.trim() !== "" : honeypot != null) {
    return json({ ok: true }, 200);
  }

  const errors: ContactErrors = validateAll(input);
  if (Object.keys(errors).length > 0) {
    // Field names and error codes only. Never the submitted values.
    return fail(400, "validation", { errors });
  }

  const token = input.token;
  if (typeof token !== "string" || token === "" || token.length > MAX_TOKEN_LENGTH) {
    return fail(400, "verification");
  }

  const secret = env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return fail(500, "server");

  const verdict = await verifyTurnstile(
    token,
    secret,
    request.headers.get("CF-Connecting-IP"),
    doFetch,
  );
  if (verdict === "unavailable") return fail(502, "server");
  if (verdict === "invalid") return fail(400, "verification");

  const trimmed: Record<string, string> = {};
  for (const key of ["role", "topic", "message", "name", "phone", "email"]) {
    const value = input[key];
    trimmed[key] = typeof value === "string" ? value.trim() : "";
  }

  const result = await doSend(env, buildEmail(trimmed));
  if (!result.ok) return fail(500, "server");

  return json({ ok: true }, 200);
}
