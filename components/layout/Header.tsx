import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { primaryNavigation } from "@/data/navigation";

// The mobile menu is a native details disclosure, so the header needs no
// client JavaScript. The desktop nav is hidden at 720px and below.
export function Header() {
  return (
    <header className="hdr">
      <div className="wrap">
        <Link className="brand" href="/" prefetch={false}>
          <Logo variant="horizontal" />
        </Link>
        <nav className="nav" aria-label="Primary">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.action ? "cta" : undefined}
              prefetch={false}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <details className="menu">
          <summary>
            <Icon name="menu" className="ico-menu" />
            <Icon name="close" className="ico-close" />
            Menu
          </summary>
          <nav aria-label="Primary">
            <ul>
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} prefetch={false}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
