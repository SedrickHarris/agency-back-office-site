// Contact form validation rules. Source: docs/contact-page-spec.md
// (Form fields and validation).
//
// No imports and no runtime dependencies. This one file is imported by the
// client form (the @/ alias) and by the Cloudflare Pages Function (a relative
// ".ts" path), so both sides apply identical rules. The Function is the
// authority; client checks only save a round trip.
//
// Use only erasable TypeScript syntax (no enums, no parameter properties) so
// Node can run this file directly in tests.

export const ROLE_VALUES = [
  "agency-owner",
  "new-agency-owner",
  "consultant",
  "freelancer",
  "other",
] as const;

export const TOPIC_VALUES = [
  "training-topics",
  "live-training",
  "sessions",
  "other",
] as const;

export type RoleValue = (typeof ROLE_VALUES)[number];
export type TopicValue = (typeof TOPIC_VALUES)[number];

export const CONTACT_LIMITS = {
  messageMin: 10,
  messageMax: 2000,
  nameMax: 100,
  phoneMax: 30,
  phoneDigitsMin: 10,
  phoneDigitsMax: 15,
  emailMax: 254,
  bodyMaxBytes: 8192,
} as const;

export type ContactField =
  | "role"
  | "topic"
  | "message"
  | "name"
  | "phone"
  | "email";

export type ContactStep = 1 | 2 | 3;

// Fields collected on each step, in on-screen order.
export const STEP_FIELDS: Record<ContactStep, readonly ContactField[]> = {
  1: ["role"],
  2: ["topic", "message"],
  3: ["name", "phone", "email"],
};

export type ContactErrorCode =
  | "role-invalid"
  | "topic-required"
  | "message-empty"
  | "message-short"
  | "message-long"
  | "name-required"
  | "phone-empty"
  | "phone-invalid"
  | "email-empty"
  | "email-invalid";

export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

export function stepOfField(field: ContactField): ContactStep {
  if (field === "role") return 1;
  if (field === "topic" || field === "message") return 2;
  return 3;
}

function isOneOf(list: readonly string[], value: string): boolean {
  return list.includes(value);
}

const PHONE_ALLOWED = /^\+?[0-9\s\-.()]+$/;
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+$/;

function validPhone(trimmed: string): boolean {
  if (trimmed.length > CONTACT_LIMITS.phoneMax) return false;
  if (!PHONE_ALLOWED.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "").length;
  return (
    digits >= CONTACT_LIMITS.phoneDigitsMin &&
    digits <= CONTACT_LIMITS.phoneDigitsMax
  );
}

function validEmail(trimmed: string): boolean {
  if (trimmed.length > CONTACT_LIMITS.emailMax) return false;
  if (!EMAIL_SHAPE.test(trimmed)) return false;
  const domain = trimmed.slice(trimmed.indexOf("@") + 1);
  // A dot in the domain, with text on both sides of every dot.
  return domain.split(".").length >= 2 && domain.split(".").every(Boolean);
}

// Returns the error code for one field, or null when the value is valid.
// Values must already be strings; callers coerce unknown input first.
export function validateField(
  field: ContactField,
  value: string,
): ContactErrorCode | null {
  const trimmed = value.trim();

  switch (field) {
    case "role":
      // Optional: empty is fine. Any value must be on the list.
      return trimmed === "" || isOneOf(ROLE_VALUES, value) ? null : "role-invalid";
    case "topic":
      return isOneOf(TOPIC_VALUES, value) ? null : "topic-required";
    case "message":
      if (trimmed === "") return "message-empty";
      if (trimmed.length < CONTACT_LIMITS.messageMin) return "message-short";
      if (trimmed.length > CONTACT_LIMITS.messageMax) return "message-long";
      return null;
    case "name":
      return trimmed.length >= 1 && trimmed.length <= CONTACT_LIMITS.nameMax
        ? null
        : "name-required";
    case "phone":
      if (trimmed === "") return "phone-empty";
      return validPhone(trimmed) ? null : "phone-invalid";
    case "email":
      if (trimmed === "") return "email-empty";
      return validEmail(trimmed) ? null : "email-invalid";
  }
}

// Validates a set of fields and returns only the ones with errors.
export function validateFields(
  fields: readonly ContactField[],
  values: Partial<Record<ContactField, unknown>>,
): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of fields) {
    const raw = values[field];
    // Non-string input (a number, an object) is never valid, even for the
    // optional role field.
    const nonString = raw != null && typeof raw !== "string";
    const code = nonString
      ? field === "role"
        ? "role-invalid"
        : validateField(field, "")
      : validateField(field, typeof raw === "string" ? raw : "");
    if (code) errors[field] = code;
  }
  return errors;
}

export function validateStep(
  step: ContactStep,
  values: Partial<Record<ContactField, unknown>>,
): ContactErrors {
  return validateFields(STEP_FIELDS[step], values);
}

export function validateAll(
  values: Partial<Record<ContactField, unknown>>,
): ContactErrors {
  return validateFields(
    [...STEP_FIELDS[1], ...STEP_FIELDS[2], ...STEP_FIELDS[3]],
    values,
  );
}
