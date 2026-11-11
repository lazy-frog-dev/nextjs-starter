# LazyFrog Next.js starter

A Next.js app with its own PostgreSQL database, ready for your AI to build on.
**Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · PostgreSQL 19**

> **New to LazyFrog?** Your AI builds the app; LazyFrog gives it a home. You can already ask
> Claude or ChatGPT to make an app. LazyFrog is where it runs: connect it to your AI once, say what
> you want, watch it take shape in a preview on your phone, and say "publish it" when it's ready.
> No servers or hosting dashboards, and every change can be undone.
> [How it works →](https://lazyfrog.dev/how-it-works)
>
> This starter is for Next.js. LazyFrog isn't limited to it: your AI can build in any language or
> framework (Node, Python, PHP, Go, Ruby, Java and more). Just ask for the stack you want.

It also runs anywhere with Docker, without LazyFrog.

## Get going in five minutes

### 1. Make a free account

[Sign up at app.lazyfrog.dev](https://app.lazyfrog.dev/sign-up). Free is for building and trying:
one project, with a database and a preview address you can share.

### 2. Connect your AI (once)

LazyFrog's address for every AI app is:

```
https://mcp.lazyfrog.dev/mcp
```

| Your AI | How to connect |
|---|---|
| **Claude** (web and phone) | On claude.ai, open **Customize › Connectors**, select **+ Add**, choose **Add custom connector**, name it **LazyFrog** and paste the address. [Step by step](https://lazyfrog.dev/connect/claude) |
| **Claude Desktop** | **Settings › Connectors › Add custom connector**, name it **LazyFrog** and paste the address. [Step by step](https://lazyfrog.dev/connect/claude-desktop) |
| **Claude Code** | `claude mcp add --transport http lazyfrog https://mcp.lazyfrog.dev/mcp`, then type `/mcp`, choose **lazyfrog** and **Authenticate**. [Step by step](https://lazyfrog.dev/connect/claude-code) |
| **ChatGPT** | On a computer, open chatgpt.com › **Plugins** › **+** › **Add custom MCP server**, name it **LazyFrog**, paste the address as the **Server URL** and choose **OAuth**. [Step by step](https://lazyfrog.dev/connect/chatgpt) |
| **Codex** | `codex mcp add lazyfrog --url https://mcp.lazyfrog.dev/mcp`, then `codex mcp login lazyfrog`. [Step by step](https://lazyfrog.dev/connect/codex) |

### 3. Sign in

When you connect, your AI app opens LazyFrog's sign-in. Sign in with your LazyFrog account and
choose **Allow**. That's all the authentication there is: no API keys to copy, and you can
disconnect any AI later under **Account › Connected AIs** in your LazyFrog account.

### 4. Start your project

Either ask your AI:

> Create a LazyFrog project called my-app from the Next.js template.

That's this starter. Or start from your own copy: select **Use this template** on GitHub to make a
public repository of your own, then ask:

> Import github.com/your-name/your-repo into LazyFrog.

### 5. Build and watch the preview

Say what you want, in your own words:

> Make this a booking page for my yoga studio: classes for the week, a sign-up form, and a list of
> bookings only I can see.

Your AI writes the code, adds database tables with migrations, and checks its work with
screenshots. It gives you the preview address (`https://p-….lazyfrog.app`): open it on your phone
or send it to someone. Ask for changes until you like it.

### 6. Go live

> Publish it.

Your AI checks the build, the migrations and the health check first, then switches over with no
downtime. Your site is live at `https://my-app.lazyfrog.app`, with a live database of its own,
separate from the preview's. Then:

> Connect my domain example.com.

Going live needs a paid plan, from Hobby at $9 a month ([pricing](https://lazyfrog.dev/pricing)).
The preview stays free.

## Work from your machine

With Claude Code or Codex in a checkout, push to update the preview:

```
git clone https://git.lazyfrog.dev/my-app.git
cd my-app
# change things, commit, then:
git push
```

Git asks for a user name (anything) and a password: use a personal token from your LazyFrog account,
**Account › Access tokens**. The push answers with the preview's address, or what to fix.
`.mcp.json` in this folder already points Claude Code at LazyFrog. More:
[working from a checkout](https://lazyfrog.dev/docs/git).

## Run it without LazyFrog

Your code is yours. With Docker:

```
docker compose up --build
```

Then open http://localhost:3000. Compose starts PostgreSQL beside the app and applies
`migrations/` when its database is first created. Without Docker: `pnpm install`, set `DATABASE_URL` to a PostgreSQL database, then
`pnpm dev`.

## What's inside

| Path | What it is |
|---|---|
| `app/` | Pages (App Router). `app/api/health/route.ts` is the health check publishing waits for. |
| `app/ui/` | Small components that follow the site's look: Button, Field, Card, Alert and more. |
| `lib/db.ts` | The PostgreSQL connection (`DATABASE_URL`, set by LazyFrog in each environment). |
| `migrations/` | SQL files applied in order: to the preview's database as you build, to the live one when you publish. |
| `services.json` | How LazyFrog runs the app: `dev` in the preview, `build` and `start` when live. |
| `design/tokens.css` | Colours, fonts and spacing. Your AI can give the site a look of its own. |
| `README-for-AI.md`, `CLAUDE.md`, `AGENTS.md` | Notes for your AI about the project's conventions. |
| `Dockerfile`, `compose.yml` | Run it anywhere else. |

## More

- [Docs](https://lazyfrog.dev/docs) · [How it works](https://lazyfrog.dev/how-it-works) ·
  [Pricing](https://lazyfrog.dev/pricing)
- The [LazyFrog plugin for Claude Code](https://github.com/lazy-frog-dev/lazyfrog) adds skills
  that guide your AI through these steps.
- Questions: [support@lazyfrog.dev](mailto:support@lazyfrog.dev)

## License

MIT. See [LICENSE](LICENSE).
