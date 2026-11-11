# Hosted on LazyFrog

This project runs on LazyFrog (https://lazyfrog.dev): a preview where it is built (not the public
site) and, once the owner publishes, a live site. Each has its own database.

- **Addresses.** The preview is at `https://p-<id>.lazyfrog.app`, the live site at
  `https://<project>.lazyfrog.app` or the owner's own domain. The LazyFrog tools give this
  project's current ones (`project_read get`).
- **The LazyFrog tools.** Claude Code reads `.mcp.json` in this folder and asks once before
  connecting (or: `claude mcp add --transport http lazyfrog https://mcp.lazyfrog.dev/mcp`). Codex:
  `codex mcp add lazyfrog --url https://mcp.lazyfrog.dev/mcp`, then `codex mcp login lazyfrog`.
  Call the `guide` tool at the start of a session.
- **Working from a checkout.** Push to update the preview: `git push` to
  `https://git.lazyfrog.dev/<project>.git` (`origin` in a clone from it, else the remote
  `lazyfrog`), with a personal token that can write as the password (the owner makes it in the
  portal: Account › Access tokens). The push answers with the preview's address, or the step that
  failed and what to do. If the preview has commits you don't have, `git pull lazyfrog main`
  first. Use the LazyFrog tools to look (logs, database, screenshots) and to publish.
- **Secrets** never go in code or in git: ask the owner with `secrets request` (a link where they
  paste the key) and read it from the environment. `.env.example` lists the names.
- **Database.** The platform sets `DATABASE_URL` for each environment: preview and live are
  separate databases. Schema changes are new files in `migrations/`, or the framework's own
  migrations when `services.json` names a `migrate` command.
- **Publishing** is the owner's decision. Run the LazyFrog `guide` tool before publishing, then
  `deploy preflight`, and `deploy publish` when they say so.
- **More:** `README-for-AI.md` (in projects started from a LazyFrog template) has the conventions:
  layout, services, toolchains. The `guide` tool has the rest.
