import { FieldFrame, describedBy } from "./FieldFrame";

export function TextArea({
  id,
  name,
  label,
  qualifier,
  helper,
  error,
  value,
  rows,
  onChange,
  onBlur,
  onFocus,
}: {
  id: string;
  name: string;
  label: string;
  qualifier: string;
  helper?: string;
  error?: string;
  value: string;
  rows: number;
  onChange: (value: string) => void;
  onBlur: () => void;
  onFocus: () => void;
}) {
  return (
    <FieldFrame
      id={id}
      label={label}
      qualifier={qualifier}
      helper={helper}
      error={error}
    >
      <textarea
        id={id}
        name={name}
        rows={rows}
        className="ct-input ct-textarea"
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, Boolean(helper), Boolean(error))}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </FieldFrame>
  );
}
