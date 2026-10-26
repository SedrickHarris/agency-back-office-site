import type { Ref } from "react";
import { Icon } from "@/components/ui/Icon";
import { FieldError } from "./FieldFrame";

// Native radio inputs in a fieldset, styled as pills. Arrow keys, Space, and
// group announcements come from the browser. The question is the legend, as a
// heading so focus can move to it when the step changes.
export function PillGroup({
  name,
  question,
  qualifier,
  helper,
  options,
  value,
  error,
  headingRef,
  onChange,
  onFocus,
}: {
  name: string;
  question: string;
  qualifier?: string;
  helper?: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  value: string;
  error?: string;
  headingRef?: Ref<HTMLHeadingElement>;
  onChange: (value: string) => void;
  onFocus: () => void;
}) {
  const helperId = `ct-${name}-help`;
  const errorId = `ct-${name}-err`;
  const describedBy =
    [helper ? helperId : "", error ? errorId : ""].filter(Boolean).join(" ") ||
    undefined;

  return (
    <fieldset
      className={error ? "ct-group has-error" : "ct-group"}
      aria-describedby={describedBy}
    >
      <legend>
        <h3 className="ct-q" tabIndex={-1} ref={headingRef}>
          {question}{" "}
          {qualifier ? <span className="ct-req">{qualifier}</span> : null}
        </h3>
      </legend>
      {helper ? (
        <p id={helperId} className="ct-help">
          {helper}
        </p>
      ) : null}
      <div className="ct-pills">
        {options.map((option) => (
          <label key={option.value} className="ct-pill">
            <input
              id={`ct-${name}-${option.value}`}
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              onFocus={onFocus}
            />
            <span>
              <Icon name="check" className="ct-chk" />
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error ? <FieldError id={errorId} message={error} /> : null}
    </fieldset>
  );
}
