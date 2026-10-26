import Image from "next/image";

type Aspect = "21:9" | "4:3";

type RealImage = { src: string; alt: string; width: number; height: number };

// Reserves a slot for a real screenshot or diagram. Pass `image` to swap in
// the real asset without changing the layout. No stock photography.
export function ImagePlaceholder({
  aspect = "21:9",
  note,
  subject,
  variant = "light",
  image,
}: {
  aspect?: Aspect;
  // Intended content, shown under the label.
  note: string;
  // Used in the accessible name, for example "SEO Training".
  subject: string;
  variant?: "light" | "dark";
  image?: RealImage;
}) {
  const classes = [
    "ph",
    variant === "dark" ? "ph-dark" : "",
    aspect === "4:3" ? "ratio-4-3" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (image) {
    return (
      <div className={classes}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
      </div>
    );
  }

  return (
    <div
      className={classes}
      role="img"
      aria-label={`Image placeholder for ${subject}`}
    >
      Image placeholder
      <small>
        {aspect} - {note}
      </small>
    </div>
  );
}
