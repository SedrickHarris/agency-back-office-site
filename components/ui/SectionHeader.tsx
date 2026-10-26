export function SectionHeader({
  id,
  title,
  intro,
  eyebrow,
  className = "",
}: {
  id: string;
  title: string;
  intro?: string;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="text-eyebrow font-display font-semibold uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="font-display text-h2 font-bold">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 max-w-[68ch] text-muted in-[.on-dark]:text-paper">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
