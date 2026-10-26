// Formats an ISO date (YYYY-MM-DD) as "October 25, 2026". Fixed locale and
// UTC so the static output is identical on every build machine.
export function formatLongDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
