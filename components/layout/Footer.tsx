import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerNavigation } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-paper">
      <Container className="flex flex-col gap-4 py-10 lg:flex-row lg:items-center lg:justify-between">
        <p className="font-display text-body font-bold">Agency Back Office</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-small">
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="py-2 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
