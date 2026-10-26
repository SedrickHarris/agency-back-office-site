// Cloudflare Pages Function: /api/contact. A non-page endpoint, never in the
// sitemap. All logic lives in functions/_lib/contact-handler.ts.
import { handleContact, type ContactEnv } from "../_lib/contact-handler.ts";

export const onRequest: PagesFunction<ContactEnv> = (context) =>
  handleContact(context.request, context.env);
