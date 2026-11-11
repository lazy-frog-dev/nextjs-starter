import type { ChangeEventHandler, ReactNode } from "react";

export type Choice = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  /** On the right: a price, a duration, "2 left". */
  meta?: ReactNode;
  disabled?: boolean;
};

type Props = {
  /** The form field's name. */
  name: string;
  /** The question, e.g. "Which treatment?" */
  legend: ReactNode;
  choices: Choice[];
  defaultValue?: string;
  required?: boolean;
  /** Error text, shown under the legend. */
  error?: ReactNode;
  /** Only in a client component, e.g. to load the times for a choice. */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

/** A radio group drawn as cards. Real radio inputs: Tab into the group, arrow keys to move, and
 * the form posts the value with no JavaScript. One column on a phone, two from sm. */
export function ChoiceCards({
  name,
  legend,
  choices,
  defaultValue,
  required,
  error,
  onChange,
  className = "",
}: Props) {
  const errorId = error ? `${name}-choice-error` : undefined;
  return (
    <fieldset className={`m-0 min-w-0 border-0 p-0 ${className}`} aria-describedby={errorId}>
      <legend className="mb-(--space-2) font-semibold">{legend}</legend>
      {error && (
        <p id={errorId} className="m-0 mb-(--space-2) text-small font-semibold text-danger">
          {error}
        </p>
      )}
      <div className="grid gap-(--space-3) sm:grid-cols-2">
        {choices.map((c) => (
          <label
            key={c.value}
            className="flex cursor-pointer items-start gap-(--space-3) rounded-look border border-border bg-background p-(--space-4) transition hover:border-primary has-checked:border-primary has-checked:bg-primary/8 has-checked:shadow-[inset_0_0_0_1px_var(--color-primary)] has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus has-disabled:cursor-not-allowed has-disabled:opacity-60"
          >
            <input
              type="radio"
              name={name}
              value={c.value}
              defaultChecked={c.value === defaultValue}
              disabled={c.disabled}
              required={required}
              onChange={onChange}
              className="mt-1 size-4 shrink-0 accent-primary focus-visible:outline-none"
            />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{c.label}</span>
              {c.description && (
                <span className="block text-small text-muted">{c.description}</span>
              )}
            </span>
            {c.meta && <span className="shrink-0 font-semibold">{c.meta}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
