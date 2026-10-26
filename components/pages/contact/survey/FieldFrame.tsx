import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

export function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="ct-error">
      <Icon name="alert" />
      <span>{message}</span>
    </p>
  );
}

// Label above, helper text, the control, then the error. The control receives
// aria-describedby from describedBy().
export function FieldFrame({
  id,
  label,
  qualifier,
  helper,
  error,
  children,
}: {
  id: string;
  label: string;
  qualifier: string;
  helper?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className={error ? "ct-field has-error" : "ct-field"}>
      <label htmlFor={id} className="ct-fl">
        {label} <span className="ct-req">{qualifier}</span>
      </label>
      {helper ? (
        <p id={`${id}-help`} className="ct-help">
          {helper}
        </p>
      ) : null}
      {children}
      {error ? <FieldError id={`${id}-err`} message={error} /> : null}
    </div>
  );
}

export function describedBy(
  id: string,
  hasHelper: boolean,
  hasError: boolean,
): string | undefined {
  const ids = [hasHelper ? `${id}-help` : "", hasError ? `${id}-err` : ""]
    .filter(Boolean)
    .join(" ");
  return ids || undefined;
}
