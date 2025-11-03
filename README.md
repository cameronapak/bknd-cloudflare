# bknd starter: Cloudflare Workers
A minimal Cloudflare Workers project with bknd integration.

## Tech Stack

This project uses:
- **Bknd.io** - bknd is a lightweight, infrastructure agnostic and feature-rich backend that runs in any JavaScript environment.
- **Hono** - Hono web server and Hono JSX components for server-side rendering
- **DataStar** - Progressive enhancement with HTML attributes for interactivity
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind component library

## Project Structure

```text
/
├── src/
│   ├── index.tsx          # Main entry point with Cloudflare Workers adapter
│   ├── components/        # Hono.jsx components
│   ├── layouts/          # Layout components
│   ├── pages/            # Page components
│   └── styles/           # Global CSS (Tailwind + DaisyUI)
├── config.ts             # Main bknd configuration
├── bknd.config.ts        # Wrapped config for type generation
├── package.json
└── wrangler.json
```

To update `bknd` config, check `config.ts`.

## Commands

All commands are run from the root of the project:

| Command           | Action                                                   |
|:------------------|:---------------------------------------------------------|
| `bun install`     | Installs dependencies                                    |
| `bun run dev`     | Starts local dev server with CSS watch at `localhost:8787` |
| `bun run typegen` | Generates wrangler and bknd types                        |

## Before you deploy
If you're using a D1 database, make sure to create a database in your cloudflare account and replace the `database_id` accordingly in `wrangler.json`.

```sh
npx wrangler d1 create my-database
```

## Want to learn more?

Feel free to check [our documentation](https://docs.bknd.io/integration/cloudflare) or jump into our [Discord server](https://discord.gg/952SFk8Tb8).
