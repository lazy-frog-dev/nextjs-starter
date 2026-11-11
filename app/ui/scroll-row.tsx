"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  /** What the arrows move through, e.g. "days": "Earlier days", "Later days". */
  noun?: string;
  className?: string;
};

const FADE = "1.5rem";
const motion = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

/** A row that scrolls sideways and shows it: the edge with more to see fades out, and with a mouse
 * (pointer: fine) an arrow on that side moves the row along (scenario round 40: the desktop strip
 * was clipped with no sign that it scrolled). The arrows are for the mouse only: keyboard and
 * screen-reader users move with the arrow keys inside the row, and the item they reach scrolls
 * clear of the fade, so the arrows stay out of the tab order and the accessibility tree, and hide
 * while the keyboard is in the row. With a mouse the row leaves room at each side and the arrows
 * sit there, so they never cover an item (scenario round 41: they hid a day's number). */
export function ScrollRow({ children, noun = "items", className = "" }: Props) {
  const row = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState({ before: false, after: false, rtl: false });

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const measure = () => {
      // Right-to-left pages scroll to negative offsets; the distance from the start is the same.
      const from = Math.abs(el.scrollLeft);
      const left = el.scrollWidth - el.clientWidth - from;
      const next = {
        before: from > 1,
        after: left > 1,
        rtl: getComputedStyle(el).direction === "rtl",
      };
      setMore((was) =>
        was.before === next.before && was.after === next.after && was.rtl === next.rtl ? was : next,
      );
    };
    // A focused radio is a 1 px input inside its card: bring the whole card into view, inside the
    // scroll padding, not just the input under the fade or an arrow.
    const reveal = (e: FocusEvent) => {
      const item = [...el.children].find((c) => c.contains(e.target as Node));
      // After the browser's own scroll to the input, which would otherwise win.
      requestAnimationFrame(() =>
        item?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: motion() }),
      );
    };
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    el.addEventListener("focusin", reveal);
    const resized = new ResizeObserver(measure);
    resized.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      el.removeEventListener("focusin", reveal);
      resized.disconnect();
    };
  }, []);

  const move = (dir: 1 | -1) => {
    const el = row.current;
    if (!el) return;
    const rtl = more.rtl ? -1 : 1;
    el.scrollBy({ left: dir * rtl * el.clientWidth * 0.8, behavior: motion() });
  };

  const mask = `linear-gradient(to ${more.rtl ? "left" : "right"}, ${more.before ? "transparent" : "#000"}, #000 ${FADE}, #000 calc(100% - ${FADE}), ${more.after ? "transparent" : "#000"})`;
  const arrow =
    "absolute top-1/2 z-10 hidden size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-border bg-background text-text shadow-1 transition hover:border-primary pointer-fine:grid group-has-focus-visible:invisible";

  return (
    <div className={`group relative pointer-fine:px-11 ${className}`}>
      <div
        ref={row}
        className="-mx-1 flex snap-x scroll-px-12 gap-(--space-2) overflow-x-auto px-1 py-1 [scrollbar-width:thin]"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        {children}
      </div>
      {more.before && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          title={`Earlier ${noun}`}
          onClick={() => move(-1)}
          className={`${arrow} start-0`}
        >
          ‹
        </button>
      )}
      {more.after && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          title={`Later ${noun}`}
          onClick={() => move(1)}
          className={`${arrow} end-0`}
        >
          ›
        </button>
      )}
    </div>
  );
}
