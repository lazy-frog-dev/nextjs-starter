import type { ReactNode } from "react";
import { type Tone, toneClass } from "./styles";

/** A short status label: "Confirmed", "3 left", "Paid". Say it in words; colour only adds. */
export function Badge({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  // On the background, not a tint: the status colours are checked against it, and a badge often
  // sits on a card's surface.
  const t = toneClass[tone];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border ${t.edge} bg-background ${t.text} px-2 py-0.5 text-small font-semibold leading-tight whitespace-nowrap ${className}`}
    >
      {children}
    </span>
  );
}
