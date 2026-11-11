# Starter UI

Small components for an app's screens, built only on the project's look (`design/tokens.css`,
mapped to Tailwind classes in `app/globals.css`). Import them from `@/app/ui`.

| Component | For |
|---|---|
| `Button` | Actions: `primary`, `secondary`, `quiet`, `danger`; a submit button shows `pendingLabel` while its form's action runs |
| `buttonClass()`, `inputClass` | The same styles on a `<Link>` or a native `<input>`, `<select>`, `<textarea>` |
| `Field` | Label, hint and error text tied to the control with `aria-describedby`; its child is a function that gets the control's props (below) |
| `Alert` | Info, success, warning, error messages (`role="status"`, errors `role="alert"`) |
| `Card`, `Badge` | A surface for one thing; a short status in words |
| `ChoiceCards` | A radio group drawn as cards (a service, a plan, a time) |
| `DateStrip`, `upcomingDays()` | A sideways-scrolling day picker, a note under any day; days in the business's time zone |
| `ScrollRow` | A row that scrolls sideways and shows it: an edge fade, arrows for a mouse |
| `EmptyState` | What a list shows before it has anything, with the first step |
| `Skeleton`, `Loading` | Placeholder shapes while data loads, announced once |
| `ConfirmInline` | Two-step cancel or delete, in place |
| `PageHeader` | The screen's one `h1`, what it is for, its main actions |

`Field`'s children is a render function, not an element: it is called with the `id`,
`aria-describedby` and `aria-invalid` the control needs, so spread them onto it:

```tsx
import { Field, inputClass } from "@/app/ui";

<Field label="Phone" hint="For a reminder text" error={errors.phone}>
  {(c) => <input {...c} name="phone" type="tel" autoComplete="tel" className={inputClass} />}
</Field>
```

They are a starting point, not a kit to show as is. For each project:

- **Compose and restyle them for this customer.** Change the markup, spacing, borders, shapes and
  copy so the app feels like the business (a salon is not a clinic is not a garage). Never ship the
  same screens twice.
- **Use the look's tokens, never fixed colours or fonts**: `bg-primary`, `text-on-primary`,
  `bg-surface`, `text-muted`, `border-line`, `font-heading`, `text-step-2`, `rounded-look`,
  `shadow-1`, `max-w-measure`, and the look's rhythm with `p-(--space-4)` or `gap-(--space-3)`.
  The full list is at the top of `app/globals.css`.
- **Cover every state** of every screen: empty (`EmptyState`), loading (`loading.tsx` with
  `Skeleton`), error (`Alert tone="error"` and `error.tsx`), success (`Alert tone="success"` or the
  next screen), and pending submits (`Button pendingLabel`). Form errors go on the field, in plain
  words that say what to do.
- **Design for the phone first**: one column, tap targets of at least 44px (`min-h-11`), nothing
  wider than the screen, the main action within reach.
- **Mark what the owner must supply** (real photos, prices, wording) with `data-lf-placeholder="what goes here"`:
  design_check counts them and the Overview lists them for the owner.
