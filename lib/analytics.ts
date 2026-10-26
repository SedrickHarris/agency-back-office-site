import type { contactEvents } from "@/data/contact";

export type AnalyticsEventName =
  (typeof contactEvents)[keyof typeof contactEvents];

// Only short, non-identifying values. Never pass a name, phone number, email
// address, message text, or any other typed value (docs/analytics-measurement.md).
export type AnalyticsParams = Record<string, string | number>;

// No analytics tool is chosen yet, so this does nothing. When one is chosen,
// send the event here and nowhere else.
export function trackEvent(
  name: AnalyticsEventName,
  params: AnalyticsParams,
): void {
  void name;
  void params;
}
