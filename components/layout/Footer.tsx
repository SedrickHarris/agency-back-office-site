import { Logo } from "@/components/ui/Logo";
import { SiteLink } from "@/components/ui/SiteLink";
import { LAST_REVIEWED, footer } from "@/data/home";
import { formatLongDate } from "@/lib/utils/date";

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <p className="ftr-brand">
          <Logo variant="icon" />
          <span>
            {footer.line}{" "}
            <time dateTime={LAST_REVIEWED}>{formatLongDate(LAST_REVIEWED)}</time>
            .
          </span>
        </p>
        <ul>
          {footer.links.map((link) => (
            <li key={link.href}>
              <SiteLink href={link.href}>{link.label}</SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
