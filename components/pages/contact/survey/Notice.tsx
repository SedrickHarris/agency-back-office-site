import type { Ref } from "react";
import { Icon } from "@/components/ui/Icon";

// Form-level error (security check, network, server). Focus moves here.
export function Notice({
  message,
  noticeRef,
}: {
  message: string;
  noticeRef: Ref<HTMLParagraphElement>;
}) {
  return (
    <div className="ct-alert ct-notice" role="alert">
      <p tabIndex={-1} ref={noticeRef}>
        <Icon name="alert" />
        <span>{message}</span>
      </p>
    </div>
  );
}
