import type { contactEvents } from "@/data/contact";

export type AnalyticsEventName =
  (typeof contactEvents)[keyof typeof contactEvents];

// Only short, non-identifying values. Never pass a name, phone number, email
// address, message text, or any other typed value (docs/analytics-measurement.md).
export type AnalyticsParams = Record<string, string | number>;

// Name of the window event every tracked event is announced on. It is the one
// integration point: an analytics adapter, or a test, listens for it.
export const ANALYTICS_EVENT = "abo:track";

// No analytics tool is chosen yet, so nothing is sent anywhere. The event is
// only dispatched in the page so the calls can be inspected. When a tool is
// chosen, send the event to it here and nowhere else.
export function trackEvent(
  name: AnalyticsEventName,
  params: AnalyticsParams,
): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(ANALYTICS_EVENT, { detail: { name, params } }),
  );
}
