import { Icon } from "@/components/ui/Icon";
import type { process } from "@/data/home";

export function ProcessTable({ content }: { content: typeof process }) {
  return (
    <section className="sec process" aria-labelledby="h-process">
      <div className="wrap">
        <div className="proc-head">
          <h2 id="h-process" className="h2">
            {content.h2}
          </h2>
          <p>{content.intro}</p>
        </div>
        <table className="proc">
          <caption>{content.caption}</caption>
          <thead>
            <tr>
              <th scope="col">{content.columns.stage}</th>
              <th scope="col">{content.columns.does}</th>
              <th scope="col">{content.columns.leaves}</th>
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row) => (
              <tr key={row.stage}>
                <th scope="row">
                  <span className="num" aria-hidden="true">
                    {row.num}
                  </span>
                  <span className="stage">{row.stage}</span>
                </th>
                <td data-label={content.columns.does}>
                  {row.does}
                  <span className="ex">
                    <b>Example:</b> {row.example}
                  </span>
                </td>
                <td data-label={content.columns.leaves}>{row.leaves}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="loopbar">
          <Icon name="loop" />
          <span>{content.loopLabel}</span>
        </p>
      </div>
    </section>
  );
}
