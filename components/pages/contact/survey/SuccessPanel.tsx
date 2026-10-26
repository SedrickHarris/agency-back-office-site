import type { Ref } from "react";
import { Icon } from "@/components/ui/Icon";
import { SiteLink } from "@/components/ui/SiteLink";
import { success } from "@/data/contact";

export function SuccessPanel({
  firstName,
  headingRef,
  onReset,
}: {
  firstName: string;
  headingRef: Ref<HTMLHeadingElement>;
  onReset: () => void;
}) {
  const { followUp } = success;

  return (
    <div className="ct-success" role="status">
      <div className="ct-success-head">
        <Icon name="check-circle" />
        <h2 className="ct-h2-sm" tabIndex={-1} ref={headingRef}>
          {success.h2}
        </h2>
      </div>
      <p>{firstName ? success.withName(firstName) : success.withoutName}</p>
      <p>
        {followUp.before}
        <SiteLink href={followUp.topicsHref}>{followUp.topicsText}</SiteLink>
        {followUp.middle}
        <SiteLink href={followUp.startHref}>{followUp.startText}</SiteLink>
        {followUp.after}
      </p>
      <button type="button" className="ct-back" onClick={onReset}>
        {success.again}
      </button>
    </div>
  );
}
