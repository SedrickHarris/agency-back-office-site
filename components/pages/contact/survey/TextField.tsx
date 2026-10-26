import { FieldFrame, describedBy } from "./FieldFrame";

export function TextField({
  id,
  name,
  label,
  qualifier,
  helper,
  error,
  value,
  type = "text",
  inputMode,
  autoComplete,
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
  type?: "text" | "tel" | "email";
  inputMode?: "tel" | "email";
  autoComplete?: string;
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
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className="ct-input"
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
