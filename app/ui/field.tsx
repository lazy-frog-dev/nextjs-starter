import { type ReactNode, useId } from "react";

type Control = { id: string; "aria-describedby"?: string; "aria-invalid"?: true };

type Props = {
  label: ReactNode;
  /** Help shown under the label, e.g. "We text you a reminder the day before." */
  hint?: ReactNode;
  /** The field's error, in plain words: what to do, not what went wrong. */
  error?: ReactNode;
  /** "(optional)" after the label; mark the optional ones, not the required ones. */
  optional?: boolean;
  className?: string;
  /** The control, given the id and ARIA attributes that tie it to the label, hint and error. */
  children: (control: Control) => ReactNode;
};

/** A labelled form field: label, hint and error text, wired up with aria-describedby.
 *
 *   <Field label="Phone" hint="For a reminder text" error={errors.phone}>
 *     {(c) => <input {...c} name="phone" type="tel" autoComplete="tel" className={inputClass} />}
 *   </Field>
 */
export function Field({ label, hint, error, optional, className = "", children }: Props) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={`grid gap-(--space-1) ${className}`}>
      <label htmlFor={id} className="font-semibold">
        {label}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {hint && (
        <p id={hintId} className="m-0 text-small text-muted">
          {hint}
        </p>
      )}
      {children({
        id,
        "aria-describedby": describedBy,
        ...(error ? { "aria-invalid": true as const } : {}),
      })}
      {error && (
        <p id={errorId} className="m-0 text-small font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
