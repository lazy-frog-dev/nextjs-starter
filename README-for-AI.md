# Project conventions

This project runs on LazyFrog. Read this before changing anything.

- **Layout.** Code lives in `/workspace` (this directory). Files the app stores at runtime go in
  `/data`; `/data/public` is served at `/files/*`. Both are in every snapshot. `.lazyfrog/` holds
  toolchains and caches: never edit or commit it.
- **Services** are defined in `services.json`: `type` (`web`, `api`, `worker`, `cron`, `static`),
  `dev` (preview command), `build` and `start` (production), `port`, `healthcheck_path`, `env`,
  `schedule` (cron, in the project's `timezone`), `dir` and `spa` (static), `pool` (PgBouncer,
  `DATABASE_POOL_URL`). Commands get `PORT` and must listen on `0.0.0.0`. Ports 5432, 6432, 7070
  and 2525 are reserved. Reload services after editing the file.
- **Health check.** `healthcheck_path` must answer 200 without authentication, quickly, and only
  when the app can serve. Publishing waits for it.
- **Database.** Each environment has its own PostgreSQL 19 (`DATABASE_URL`). Schema changes are
  SQL files in `migrations/` (`0002_description.sql`, ...), applied in order, each in its own
  transaction, never edited once applied. A framework's own migration command can replace them:
  set `"migrate"` in `services.json`. Preview and production databases are separate; production
  data is never copied from preview.
- **Toolchains** come from `.tool-versions` (mise). Node, Python, Bun, pnpm and uv are preinstalled;
  other versions install on first use.
- **Preview and production.** Preview runs `dev` with hot reload. Publishing runs `build`, applies
  migrations to the production database and starts `start`.
- **Secrets** are set per environment through the platform and arrive as environment variables;
  never commit them. `.env.example` lists the names the app expects.
- **Dependencies** come from the lockfile; new versions must be at least a week old.

## This template: Next.js

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Pages in `app/`, shared code in
  `lib/`. Server components can query the database directly through `lib/db.ts` (`pg` pool).
- `pnpm add <package>` to add dependencies (commit `pnpm-lock.yaml`). Type-check on Hobby and up
  with `node --run typecheck` in the preview: the same script as `pnpm typecheck`, run by Node
  itself, so pnpm doesn't stay beside it (about 50 MB, which a type check beside `next dev` in
  1 GB needs). The first run takes about 200 MB, later ones about 130 MB (it keeps what it learnt
  in `node_modules/.cache`). On Free (768 MB) a type check doesn't fit beside `next dev` and is
  stopped: type-check with `deploy preflight` instead, which builds the app as a publish will
  (`next build` checks types). `pnpm build` is what publishing runs, in a sandbox of its own: on
  every plan, leave the build to `deploy preflight` and don't run it in the preview. Beside
  `next dev` a production build needs about as much memory again, more than Free's and Hobby's
  preview has, and it is stopped there.
- **The dev server's memory.** `services.json` starts `next dev` directly (`exec
  ./node_modules/.bin/next dev`), not through `pnpm dev`, which would stay beside it; keep it
  that way. `next.config.ts` turns off Turbopack's cache on disk for `next dev`: saving it
  briefly doubled the dev server's memory, enough to take a 1 GB preview down. So the first
  request to each page compiles it after every restart or wake (a few seconds), and `next dev`
  keeps every page it has compiled since it started (about 15 MB each): after building many
  pages, `service` `restart` `web` gives that back before a type check.
- The health check is `app/api/health/route.ts`; keep it fast and unauthenticated.
- **Entry hostnames** (`portal.example.com`, `api.example.com` with the role entry) reach this
  same app with their own `Host`; production lists them in `SITE_HOSTS`. Route them in `proxy.ts`
  by exact hostname (never `startsWith("portal.")`, which also matches `portal.lazyfrog.app`),
  with an anchored matcher that skips `_next/`, `/api`, static files by their extension (not any
  dotted path: `/invoices/INV-2026.10` is a page) and the generated icon and opengraph images: the
  guide's custom-domains example. A shared sign-in sets its cookie's
  `Domain` to `SITE_COOKIE_DOMAIN`, only on hosts under it. `req.url` is `0.0.0.0` in production:
  build absolute URLs from `Host` or `SITE_URL`. Test before DNS with a `Host` header
  (`http_request` `headers: {host}`).

## Polish in this app

- **The look.** `look apply` writes `design/tokens.css` (a plain stand-in ships until then).
  `app/globals.css` must start with `@layer theme, base, lf-base, components, utilities;` before
  `@import "tailwindcss"` and `@import "../design/tokens.css"`: otherwise the look's base styles
  are the lowest layer and Tailwind's reset undoes them. Keep `class="lf-base lf-ui"` on `<body>`.
- **Tailwind classes follow the look** through the `@theme inline` block in `app/globals.css`:
  `bg-primary`, `text-on-primary`, `bg-surface`, `text-muted`, `border-line`, `text-danger`,
  `font-heading`, `text-step-1` to `text-step-5`, `rounded-look`, `shadow-1`, `max-w-measure`, and
  the look's spacing as `p-(--space-4)`. Don't hard-code colours or fonts.
- **Components** in `app/ui/` (Button, Field, Alert, Card, Badge, ChoiceCards, DateStrip,
  EmptyState, Skeleton, ConfirmInline, PageHeader, ScrollRow): compose and restyle them for this
  customer; read `app/ui/README.md`.
- **Every state**: empty, loading, error, success and pending, on a phone first.
- **Placeholders**: mark content the owner must supply with
  `data-lf-placeholder="what goes here"`; the owner sees the list on the Overview. A photo slot
  is an `<img>` marked so, or a stand-in such as
  `<div role="img" aria-label="Photo of the van" data-lf-placeholder="Van photo" className="aspect-[4/3]">`.
  For the owner's photos, `images` `view` them (`paths: ["data/import"]`), then `images` `place`
  (`from`, `file`: the component, `slot`, `alt`): it makes the web versions in the slot's shape
  into `public/images/` and returns the `<img>` and the line to put it on.
- **Runtime data never goes in the app's folder.** `next dev` watches the project (and Tailwind
  reads every file in it that `.gitignore` doesn't skip), so a JSON file, an upload or a log written
  there on each request recompiles and reloads the preview over and over ("Compiled in 2ms" before
  every request in `logs_tail`). Keep data in the database, files under `/data`. A client
  `useEffect` that calls `router.refresh()` on every render loops the same way.
- **Check it**: `design_check` lists what to fix at phone, tablet and wide laptop;
  `preview_screenshot` with `viewport: "all"` shows the three widths side by side. For signed-in
  pages, sign in with `http_request` first and pass the session cookie to both as `headers`.
