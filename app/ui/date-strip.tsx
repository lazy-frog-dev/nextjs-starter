import type { ChangeEventHandler } from "react";
import { ScrollRow } from "./scroll-row";

export type Day = {
  /** YYYY-MM-DD. */
  value: string;
  disabled?: boolean;
  /** Said with the date and shown under it, e.g. "Fully booked", "Closed", "3 times left"; a
   * disabled day without one says "Closed". */
  note?: string;
};

type Props = {
  name: string;
  legend?: string;
  days: Day[];
  defaultValue?: string;
  /** For the weekday and month names, e.g. "en-ZA" (default the browser's or the server's). */
  locale?: string;
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

// The value is a calendar date, so it is read and named in UTC: no time zone shifts it a day.
const at = (iso: string) => new Date(`${iso}T12:00:00Z`);
const fmt = (locale: string | undefined, o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(locale, { ...o, timeZone: "UTC" });

/** The next `count` days as YYYY-MM-DD, starting today in `timeZone` (the business's, e.g.
 * "Africa/Johannesburg", so the strip doesn't start on yesterday for the server). */
export function upcomingDays(count: number, timeZone: string, from = new Date()): string[] {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone }).format(from);
  const start = at(today).getTime();
  return Array.from({ length: count }, (_, i) =>
    new Date(start + i * 86_400_000).toISOString().slice(0, 10),
  );
}

/** A horizontal day picker: real radio inputs in a strip that scrolls sideways when the days don't
 * fit (the page doesn't), with a fade and, for a mouse, arrows on the side with more. Arrow keys
 * move between days; each day is read out in full with its note. */
export function DateStrip({
  name,
  legend = "Day",
  days,
  defaultValue,
  locale,
  required,
  onChange,
  className = "",
}: Props) {
  const wd = fmt(locale, { weekday: "short" });
  const dn = fmt(locale, { day: "numeric" });
  const mo = fmt(locale, { month: "short" });
  const full = fmt(locale, { weekday: "long", day: "numeric", month: "long" });
  return (
    <fieldset className={`m-0 min-w-0 border-0 p-0 ${className}`}>
      <legend className="mb-(--space-2) font-semibold">{legend}</legend>
      <ScrollRow noun="days">
        {days.map((d) => {
          const date = at(d.value);
          // A day that can't be picked says why in words, and only its number is struck through
          // (scenario round 39: the whole label struck through was hard to read). Every day shows
          // its note, not only a disabled one (scenario round 40: "3 times left" was read out
          // but never shown).
          const why = d.disabled ? (d.note ?? "Closed") : d.note;
          // On a phone four and a half days show, so the half day at the edge says the strip
          // scrolls (scenario round 41: the fade alone was easy to miss).
          return (
            <label
              key={d.value}
              className="relative flex w-[calc((100%_-_4*var(--space-2))/4.5)] min-w-14 shrink-0 sm:w-auto sm:min-w-16 cursor-pointer snap-start flex-col items-center rounded-look border border-border bg-background px-(--space-3) py-(--space-2) text-center transition hover:border-primary has-checked:border-primary has-checked:bg-primary has-checked:text-on-primary has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus has-disabled:cursor-not-allowed has-disabled:bg-surface has-disabled:text-muted"
            >
              <input
                type="radio"
                name={name}
                value={d.value}
                defaultChecked={d.value === defaultValue}
                disabled={d.disabled}
                required={required}
                onChange={onChange}
                aria-label={[full.format(date), why].filter(Boolean).join(", ")}
                className="sr-only"
              />
              <span className="text-small" aria-hidden="true">
                {wd.format(date)}
              </span>
              <span
                className={`font-heading text-step-1 leading-tight ${d.disabled ? "line-through" : ""}`}
                aria-hidden="true"
              >
                {dn.format(date)}
              </span>
              <span className="text-small" aria-hidden="true">
                {mo.format(date)}
              </span>
              {why && (
                <span className="text-small" aria-hidden="true">
                  {why}
                </span>
              )}
            </label>
          );
        })}
      </ScrollRow>
    </fieldset>
  );
}
