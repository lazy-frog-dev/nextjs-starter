import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  /** What will appear here, and how to get it there. */
  children?: ReactNode;
  /** The next step, e.g. <Link className={buttonClass()} href="/book">Book a time</Link>. */
  action?: ReactNode;
  /** A small illustration or icon (decorative: aria-hidden). */
  art?: ReactNode;
  className?: string;
};

/** What a list or page shows before it has anything: say what goes here and offer the first step,
 * never just "No data". */
export function EmptyState({ title, children, action, art, className = "" }: Props) {
  return (
    <div
      className={`grid justify-items-center gap-(--space-3) rounded-look border border-dashed border-border px-(--space-5) py-(--space-7) text-center ${className}`}
    >
      {art && (
        <div aria-hidden="true" className="text-muted">
          {art}
        </div>
      )}
      <p className="m-0 font-heading text-step-1">{title}</p>
      {children && <div className="max-w-measure text-muted [&>p]:m-0">{children}</div>}
      {action && <div className="mt-(--space-2)">{action}</div>}
    </div>
  );
}
