import Image from "next/image";

// Official logo masters live in assets/brand-masters/ and are not shipped. The
// files below are 2x site-sized derivatives of those masters (see
// docs/design-system.md, Brand).
const LOGO_ALT = "Agency Back Office - Practical Agency Training";

const variants = {
  horizontal: {
    src: "/brand/logo-horizontal.webp",
    width: 172,
    height: 64,
    className: "logo-h",
    alt: LOGO_ALT,
  },
  "horizontal-dark": {
    src: "/brand/logo-horizontal-dark.webp",
    width: 172,
    height: 64,
    className: "logo-band",
    alt: LOGO_ALT,
  },
  icon: {
    src: "/brand/logo-icon.webp",
    width: 39,
    height: 36,
    className: "logo-i",
    alt: "",
  },
} as const;

export function Logo({ variant }: { variant: keyof typeof variants }) {
  const logo = variants[variant];

  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      className={logo.className}
      priority={variant === "horizontal"}
    />
  );
}
