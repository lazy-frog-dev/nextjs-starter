// Class names built on the look's tokens (app/globals.css maps them to Tailwind), shared by the
// components and usable on their own: <Link href="/book" className={buttonClass("primary")}>.
// Plain functions, not a client module, so server components can call them.

export type ButtonVariant = "primary" | "secondary" | "quiet" | "danger";

const variants: Record<ButtonVariant, string> = {
  primary: "border-primary bg-primary text-on-primary hover:brightness-110",
  secondary: "border-border bg-transparent text-text hover:bg-surface",
  quiet: "border-transparent bg-transparent text-link hover:bg-surface",
  danger: "border-danger bg-danger text-background hover:brightness-110",
};

export function buttonClass(variant: ButtonVariant = "primary", extra = "") {
  return [
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-look border px-(--space-5) py-(--space-2)",
    "font-body font-semibold no-underline transition",
    "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus",
    "disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:opacity-60",
    variants[variant],
    extra,
  ].join(" ");
}

/** Text inputs, selects and textareas. */
export const inputClass = [
  "block w-full min-h-11 rounded-field border border-border bg-background px-(--space-3) py-(--space-2)",
  "font-body text-text placeholder:text-muted",
  "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus",
  "aria-invalid:border-danger disabled:opacity-60",
].join(" ");

export type Tone = "neutral" | "info" | "success" | "warning" | "danger";

/** Text and tint per tone: the text colours are legible on the look's background and surface. */
export const toneClass: Record<Tone, { text: string; tint: string; edge: string }> = {
  neutral: { text: "text-muted", tint: "bg-surface", edge: "border-line" },
  info: { text: "text-link", tint: "bg-primary/8", edge: "border-primary" },
  success: { text: "text-success", tint: "bg-success/8", edge: "border-success" },
  warning: { text: "text-warning", tint: "bg-warning/10", edge: "border-warning" },
  danger: { text: "text-danger", tint: "bg-danger/8", edge: "border-danger" },
};
