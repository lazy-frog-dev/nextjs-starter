import type { ReactNode } from "react";

/** A placeholder shape while content loads (in loading.tsx or a Suspense fallback). Size it like
 * the content it stands for, so nothing jumps when it arrives. */
export function Skeleton({ className = "h-4 w-full" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block animate-pulse rounded-field bg-line motion-reduce:animate-none ${className}`}
    />
  );
}

/** Wraps skeletons with one announcement for screen readers, e.g. label="Loading your bookings". */
export function Loading({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}
