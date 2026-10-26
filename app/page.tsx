import type { Metadata } from "next";

// Not indexable until the approved home page copy is in place.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// TEMPORARY - replace with approved home page copy.
export default function HomePage() {
  return <h1>Placeholder: / (home)</h1>;
}
