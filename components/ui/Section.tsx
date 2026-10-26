import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type Tone = "default" | "tint" | "ink";

const toneClasses: Record<Tone, string> = {
  default: "bg-paper text-ink",
  tint: "bg-tint text-ink",
  ink: "on-dark bg-ink text-paper",
};

export function Section({
  labelledBy,
  tone = "default",
  className = "py-16 lg:py-24",
  children,
}: {
  labelledBy: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={labelledBy} className={toneClasses[tone]}>
      <Container className={className}>{children}</Container>
    </section>
  );
}
