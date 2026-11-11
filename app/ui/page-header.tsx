import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  description?: ReactNode;
  /** Buttons or links for the page, e.g. "New booking". Stack under the title on a phone. */
  actions?: ReactNode;
  /** A way up, e.g. { href: "/bookings", label: "All bookings" }. */
  back?: { href: string; label: string };
  className?: string;
};

/** The top of an app screen: the one h1, what the screen is for, and its main actions. */
export function PageHeader({ title, description, actions, back, className = "" }: Props) {
  return (
    <header
      className={`mb-(--space-6) flex flex-col gap-(--space-3) sm:flex-row sm:items-end sm:justify-between ${className}`}
    >
      <div className="min-w-0">
        {back && (
          <Link
            href={back.href}
            className="mb-(--space-2) inline-flex min-h-11 items-center text-small text-link"
          >
            <span aria-hidden="true">← </span>
            {back.label}
          </Link>
        )}
        <h1 className="m-0 font-heading text-step-4">{title}</h1>
        {description && <p className="mt-(--space-2) mb-0 text-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-(--space-2)">{actions}</div>}
    </header>
  );
}
