// Tests for POST /api/contact (functions/_lib/contact-handler.ts).
// Run with `npm test` (Node's built-in test runner, no extra dependencies).
//
// Turnstile is simulated by a fake fetch that follows Cloudflare's published
// dummy secret keys (developers.cloudflare.com/turnstile/troubleshooting/testing):
//   1x0000000000000000000000000000000AA  validation succeeds every time
//   2x0000000000000000000000000000000AA  validation fails every time
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  handleContact,
  type ContactEnv,
} from "../functions/_lib/contact-handler.ts";
import { sendEmail } from "../functions/_lib/send-email.ts";

const PASS_SECRET = "1x0000000000000000000000000000000AA";
const FAIL_SECRET = "2x0000000000000000000000000000000AA";

const env: ContactEnv = {
  TURNSTILE_SECRET_KEY: PASS_SECRET,
  EMAIL_API_KEY: "test-key",
  CONTACT_TO_EMAIL: "to@example.com",
  CONTACT_FROM_EMAIL: "from@example.com",
};

const validBody = {
  role: "consultant",
  topic: "live-training",
  message: "I want to know how live training works.",
  name: "Alex Rivera",
  phone: "+1 (555) 123-4567",
  email: "alex@example.com",
  website: "",
  token: "XXXX.DUMMY.TOKEN.XXXX",
};

const siteverifyCalls: string[] = [];
const fakeFetch = (async (_url: string | URL | Request, init?: RequestInit) => {
  const form = init?.body as URLSearchParams;
  const secret = form.get("secret") ?? "";
  siteverifyCalls.push(secret);
  return new Response(JSON.stringify({ success: secret === PASS_SECRET }), {
    status: 200,
  });
}) as typeof fetch;

type Sent = { subject: string; text: string; replyTo: string };
function recorder(ok = true) {
  const sent: Sent[] = [];
  const send: typeof sendEmail = async (_env, message) => {
    sent.push(message);
    return { ok };
  };
  return { sent, send };
}

function post(body: unknown, headers: Record<string, string> = {}) {
  return new Request("https://example.test/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

async function run(
  body: unknown,
  opts: { env?: ContactEnv; ok?: boolean; headers?: Record<string, string> } = {},
) {
  const { sent, send } = recorder(opts.ok ?? true);
  const res = await handleContact(post(body, opts.headers), opts.env ?? env, {
    fetch: fakeFetch,
    sendEmail: send,
  });
  return { res, data: (await res.json()) as Record<string, unknown>, sent };
}

describe("POST /api/contact", () => {
  it("accepts a valid submission and sends one email", async () => {
    const { res, data, sent } = await run(validBody);
    assert.equal(res.status, 200);
    assert.deepEqual(data, { ok: true });
    assert.equal(sent.length, 1);
    assert.equal(sent[0].replyTo, "alex@example.com");
    assert.equal(sent[0].subject, "Contact form: Live training");
  });

  it("accepts a valid submission with the optional role left empty", async () => {
    const { res, sent } = await run({ ...validBody, role: "" });
    assert.equal(res.status, 200);
    assert.equal(sent.length, 1);
  });

  it("returns a normal ok response and sends nothing when the honeypot is filled", async () => {
    const before = siteverifyCalls.length;
    const { res, data, sent } = await run({ ...validBody, website: "https://spam.example" });
    assert.equal(res.status, 200);
    assert.deepEqual(data, { ok: true });
    assert.equal(sent.length, 0);
    assert.equal(siteverifyCalls.length, before, "no Turnstile call for bots");
  });

  it("rejects an empty email", async () => {
    const { res, data, sent } = await run({ ...validBody, email: "" });
    assert.equal(res.status, 400);
    assert.equal(data.code, "validation");
    assert.deepEqual(data.errors, { email: "email-empty" });
    assert.equal(sent.length, 0);
  });

  it("rejects invalid emails", async () => {
    for (const email of ["nope", "a@b", "a@.com", "a@b.", "@b.com", "a b@c.com"]) {
      const { data } = await run({ ...validBody, email });
      assert.equal(data.code, "validation", email);
      assert.deepEqual(data.errors, { email: "email-invalid" }, email);
    }
  });

  it("rejects a phone number with 9 digits and one with 16 digits", async () => {
    const nine = await run({ ...validBody, phone: "555 123 456" });
    assert.deepEqual(nine.data.errors, { phone: "phone-invalid" });
    const sixteen = await run({ ...validBody, phone: "1234567890123456" });
    assert.deepEqual(sixteen.data.errors, { phone: "phone-invalid" });
  });

  it("accepts a phone number with 10 and with 15 digits", async () => {
    assert.equal((await run({ ...validBody, phone: "5551234567" })).res.status, 200);
    assert.equal((await run({ ...validBody, phone: "+123456789012345" })).res.status, 200);
  });

  it("rejects letters and a misplaced plus in the phone number", async () => {
    for (const phone of ["555-123-CALL", "555+123+4567"]) {
      const { data } = await run({ ...validBody, phone });
      assert.deepEqual(data.errors, { phone: "phone-invalid" }, phone);
    }
  });

  it("rejects a message with 9 characters and one with 2,001", async () => {
    const short = await run({ ...validBody, message: "123456789" });
    assert.deepEqual(short.data.errors, { message: "message-short" });
    const long = await run({ ...validBody, message: "a".repeat(2001) });
    assert.deepEqual(long.data.errors, { message: "message-long" });
  });

  it("accepts messages of exactly 10 and 2,000 characters", async () => {
    assert.equal((await run({ ...validBody, message: "a".repeat(10) })).res.status, 200);
    assert.equal((await run({ ...validBody, message: "a".repeat(2000) })).res.status, 200);
  });

  it("rejects a topic or role outside the lists", async () => {
    const topic = await run({ ...validBody, topic: "courses" });
    assert.deepEqual(topic.data.errors, { topic: "topic-required" });
    const role = await run({ ...validBody, role: "wizard" });
    assert.deepEqual(role.data.errors, { role: "role-invalid" });
  });

  it("rejects non-string values", async () => {
    const { data } = await run({ ...validBody, name: 42, role: ["agency-owner"] });
    assert.deepEqual(data.errors, { role: "role-invalid", name: "name-required" });
  });

  it("returns 405 for any method other than POST", async () => {
    for (const method of ["GET", "PUT", "DELETE"]) {
      const res = await handleContact(
        new Request("https://example.test/api/contact", { method }),
        env,
        { fetch: fakeFetch },
      );
      assert.equal(res.status, 405, method);
      assert.equal(res.headers.get("Allow"), "POST");
    }
  });

  it("returns 413 for a body over 8 KB", async () => {
    const { res, sent } = await run({ ...validBody, message: "a".repeat(9000) });
    assert.equal(res.status, 413);
    assert.equal(sent.length, 0);
  });

  it("returns 400 for a body that is not JSON", async () => {
    const { res, data } = await run("not json");
    assert.equal(res.status, 400);
    assert.equal(data.code, "validation");
  });

  it("returns the verification code when the Turnstile token is missing", async () => {
    const withoutToken: Record<string, unknown> = { ...validBody };
    delete withoutToken.token;
    const { res, data } = await run(withoutToken);
    assert.equal(res.status, 400);
    assert.equal(data.code, "verification");
  });

  it("returns the verification code when Turnstile rejects the token", async () => {
    const { res, data, sent } = await run(validBody, {
      env: { ...env, TURNSTILE_SECRET_KEY: FAIL_SECRET },
    });
    assert.equal(res.status, 400);
    assert.equal(data.code, "verification");
    assert.equal(sent.length, 0);
  });

  it("returns the server code when Turnstile cannot be reached", async () => {
    const down = (async () => {
      throw new Error("offline");
    }) as typeof fetch;
    const res = await handleContact(post(validBody), env, { fetch: down });
    assert.equal(res.status, 502);
    assert.equal(((await res.json()) as { code: string }).code, "server");
  });

  it("returns the server code when sendEmail is not configured", async () => {
    // Uses the real sendEmail: no provider is chosen yet.
    const res = await handleContact(post(validBody), env, { fetch: fakeFetch });
    assert.equal(res.status, 500);
    assert.deepEqual(await res.json(), { ok: false, code: "server" });
  });

  it("returns the server code when the provider fails", async () => {
    const { res, data } = await run(validBody, { ok: false });
    assert.equal(res.status, 500);
    assert.deepEqual(data, { ok: false, code: "server" });
  });

  it("checks Origin only when the site URL is set", async () => {
    const withUrl: ContactEnv = { ...env, NEXT_PUBLIC_SITE_URL: "https://site.example" };
    const wrong = await run(validBody, { env: withUrl, headers: { Origin: "https://evil.example" } });
    assert.equal(wrong.res.status, 403);
    const missing = await run(validBody, { env: withUrl });
    assert.equal(missing.res.status, 403);
    const right = await run(validBody, { env: withUrl, headers: { Origin: "https://site.example" } });
    assert.equal(right.res.status, 200);
    // Unset: any origin is accepted.
    const unset = await run(validBody, { headers: { Origin: "https://anything.example" } });
    assert.equal(unset.res.status, 200);
  });

  it("never echoes submitted values or stack traces", async () => {
    const { data } = await run({ ...validBody, email: "bad", name: "Secret Person" });
    const text = JSON.stringify(data);
    assert.ok(!text.includes("Secret Person"));
    assert.ok(!text.includes("bad"));
    assert.ok(!/stack|Error:/.test(text));
  });
});
