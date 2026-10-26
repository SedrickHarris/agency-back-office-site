import { SectionHeader } from "@/components/ui/SectionHeader";

type Item = { question: string; answer: string };

export function FaqList({
  headingId,
  h2,
  items,
}: {
  headingId: string;
  h2: string;
  items: Item[];
}) {
  return (
    <div className="lg:mx-auto lg:max-w-[720px]">
      <SectionHeader id={headingId} title={h2} />
      <div className="mt-10 border-b border-rule">
        {items.map((item, index) => (
          <details
            key={item.question}
            open={index === 0}
            className="border-t border-rule"
          >
            <summary className="faq-summary flex min-h-14 cursor-pointer items-center justify-between gap-4 py-3">
              <h3 className="font-display text-h3 font-semibold">
                {item.question}
              </h3>
            </summary>
            <p className="max-w-[68ch] pb-6 text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
