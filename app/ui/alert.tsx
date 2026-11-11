import type { ReactNode } from "react";
import { toneClass } from "./styles";

type Props = {
  tone?: "info" | "success" | "warning" | "error";
  title?: ReactNode;
  children?: ReactNode;
  /** A follow-up, e.g. a link to the booking or a retry button. */
  action?: ReactNode;
  className?: string;
};

/** A message in the flow of the page. Errors are role="alert" (read out at once); the rest are
 * role="status" (read out politely). Render it when the message appears, not hidden beforehand. */
export function Alert({ tone = "info", title, children, action, className = "" }: Props) {
  const t = toneClass[tone === "error" ? "danger" : tone];
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-look border-s-4 ${t.edge} ${t.tint} p-(--space-4) ${className}`}
    >
      {title && <p className={`m-0 font-semibold ${t.text}`}>{title}</p>}
      {children && <div className="mt-(--space-1) text-text [&>p]:m-0">{children}</div>}
      {action && <div className="mt-(--space-3)">{action}</div>}
    </div>
  );
}
