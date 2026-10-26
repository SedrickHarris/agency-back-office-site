// The only file that talks to an email provider.
//
// The provider is not chosen yet (docs/decisions-change-log.md, "Contact form
// handling"). To pick one, implement `deliver` below with that provider's API,
// using EMAIL_API_KEY, and nothing else in the project changes. Until then,
// sendEmail reports failure, and the Function answers with the "server" code.
//
// Do not log message text, phone numbers, or email addresses here.

export type EmailEnv = {
  EMAIL_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
};

export type EmailMessage = {
  subject: string;
  text: string;
  // The visitor's email address, validated by the Function (no whitespace).
  replyTo: string;
};

export type SendEmailResult = { ok: boolean };

type DeliverInput = {
  apiKey: string;
  to: string;
  from: string;
  message: EmailMessage;
};

type Deliver = (input: DeliverInput) => Promise<SendEmailResult>;

// Provider seam. Returns null while no provider is chosen.
function getProvider(): Deliver | null {
  return null;
}

export async function sendEmail(
  env: EmailEnv,
  message: EmailMessage,
): Promise<SendEmailResult> {
  const apiKey = env.EMAIL_API_KEY?.trim();
  const to = env.CONTACT_TO_EMAIL?.trim();
  const from = env.CONTACT_FROM_EMAIL?.trim();

  const deliver = getProvider();
  if (!deliver || !apiKey || !to || !from) return { ok: false };

  try {
    return await deliver({ apiKey, to, from, message });
  } catch {
    return { ok: false };
  }
}
