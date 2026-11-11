import type { ComponentProps, ElementType, ReactNode } from "react";

type Props<T extends ElementType> = {
  /** The element: "section", "article", "li"… (default div). */
  as?: T;
  /** Raised (a shadow) instead of outlined. */
  raised?: boolean;
  children?: ReactNode;
} & Omit<ComponentProps<T>, "as" | "children">;

/** A surface for one thing: a booking, a plan, a summary. */
export function Card<T extends ElementType = "div">({
  as,
  raised,
  className = "",
  children,
  ...rest
}: Props<T>) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      className={`min-w-0 rounded-look border border-line bg-surface p-(--space-5) ${raised ? "shadow-2" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
