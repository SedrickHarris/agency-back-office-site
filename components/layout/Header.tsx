import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { primaryNavigation } from "@/data/navigation";

export function Header() {
  return (
    <header className="border-b border-rule bg-paper">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
        <Link href="/" className="font-display text-h3 font-bold">
          Agency Back Office
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-display text-small font-semibold">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="py-2 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
