"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "./button";

type Props = {
  /** The first button, e.g. "Cancel booking". */
  label: ReactNode;
  /** The question once asked, e.g. "Cancel Tuesday 10:00? We let the salon know." */
  question: ReactNode;
  /** The button that does it, e.g. "Yes, cancel it". */
  confirmLabel: ReactNode;
  /** The way back, e.g. "Keep it". */
  keepLabel?: ReactNode;
  /** Shown on the confirm button while the action runs, e.g. "Cancelling…". */
  pendingLabel?: string;
  /** A server action; it gets the hidden fields. */
  action: (data: FormData) => void | Promise<void>;
  /** Hidden fields sent with the action, e.g. { id: booking.id }. */
  fields?: Record<string, string>;
};

/** A two-step inline confirm for cancelling or deleting: the first press asks, in place, and only
 * the second does it. Focus moves to "Keep it" (so a double click can't confirm), Escape backs out
 * and focus returns to the first button. */
export function ConfirmInline({
  label,
  question,
  confirmLabel,
  keepLabel = "Keep it",
  pendingLabel,
  action,
  fields = {},
}: Props) {
  const [asking, setAsking] = useState(false);
  const keep = useRef<HTMLButtonElement>(null);
  const start = useRef<HTMLButtonElement>(null);
  const wasAsking = useRef(false);

  useEffect(() => {
    if (asking) keep.current?.focus();
    else if (wasAsking.current) start.current?.focus();
    wasAsking.current = asking;
  }, [asking]);

  if (!asking)
    return (
      <Button ref={start} variant="secondary" onClick={() => setAsking(true)}>
        {label}
      </Button>
    );

  return (
    <form
      action={action}
      onKeyDown={(e) => e.key === "Escape" && setAsking(false)}
      className="flex flex-wrap items-center gap-(--space-2) rounded-look border border-danger bg-danger/8 p-(--space-3)"
    >
      {Object.entries(fields).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <p role="status" className="m-0 w-full font-semibold sm:w-auto sm:flex-1">
        {question}
      </p>
      <Button ref={keep} variant="secondary" onClick={() => setAsking(false)}>
        {keepLabel}
      </Button>
      <Button type="submit" variant="danger" pendingLabel={pendingLabel}>
        {confirmLabel}
      </Button>
    </form>
  );
}
