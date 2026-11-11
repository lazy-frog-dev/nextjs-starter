"use client";

import type { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { type ButtonVariant, buttonClass } from "./styles";

type Props = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  /** Shown while the surrounding form submits (submit buttons only), e.g. "Booking…". */
  pendingLabel?: string;
};

/** A button on the look's tokens. A submit button shows a spinner and is disabled while its form's
 * action runs (useFormStatus), so a slow server action can't be sent twice. */
export function Button({
  variant = "primary",
  pendingLabel,
  type = "button",
  disabled,
  className = "",
  children,
  ...rest
}: Props) {
  const { pending } = useFormStatus();
  const busy = pending && type === "submit";
  return (
    <button
      type={type}
      disabled={disabled || busy}
      aria-busy={busy || undefined}
      className={buttonClass(variant, className)}
      {...rest}
    >
      {busy && (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none"
        />
      )}
      {busy && pendingLabel ? pendingLabel : children}
    </button>
  );
}
