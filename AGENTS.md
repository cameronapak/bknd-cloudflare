# AGENTS.md

## Project Snapshot

Simple single project: bknd.io backend framework + Cloudflare Workers + Hono JSX frontend. Tailwind CSS v4 + DaisyUI for styling. DataStar for progressive enhancement. TypeScript strict mode. See [src/AGENTS.md](src/AGENTS.md) for detailed source code patterns.

## Root Setup Commands

- Install: `bun install`
- Dev server: `bun run dev` (runs CSS watch + wrangler dev concurrently)
- Build CSS: `bun run build:css`
- Type generation: `bun run typegen` (generates wrangler + bknd types)
- Deploy: `bun run deploy`
- No test suite configured

## Universal Conventions

- **JSX**: Always include `/** @jsxImportSource hono/jsx */` pragma at top of `.tsx` files
- **JSX attributes**: Use `class` not `className` (Hono JSX uses HTML attributes)
- **TypeScript**: Strict mode enabled, auto-generated types from `bknd-types.d.ts` (never edit manually)
- **Imports**: Relative paths, use `import type` for type-only imports
- **Naming**: PascalCase components, camelCase props/functions, kebab-case CSS classes
- **Commits**: Use conventional commits format
- **Error handling**: API routes return `c.json({error: msg}, status)` for errors

## Security & Secrets

- Never commit tokens or secrets
- Configuration in `config.ts` (runtime) and `bknd.config.ts` (typegen proxy)
- Database bindings via `wrangler.json` (D1: `bknd_nov_2025_d1`, R2: `bknd_nov_2025_r2`)
- Use environment variables for sensitive values (configure in Cloudflare dashboard)

## JIT Index (what to open, not what to paste)

### Source Structure

- Routes & API: `src/index.tsx` → [see src/AGENTS.md](src/AGENTS.md)
- Pages: `src/pages/` → [see src/AGENTS.md](src/AGENTS.md)
- Components: `src/components/` → [see src/AGENTS.md](src/AGENTS.md)
- Layouts: `src/layouts/` → [see src/AGENTS.md](src/AGENTS.md)
- Styles: `src/styles/global.css` → [see src/AGENTS.md](src/AGENTS.md)

### Configuration Files

- Runtime config: `config.ts`
- Typegen config: `bknd.config.ts`
- Worker config: `wrangler.json`
- TypeScript: `tsconfig.json`

### Quick Find Commands

- Find a component: `rg -n "export function .*" src/components src/pages`
- Find a route handler: `rg -n "app\.server\.(get|post)" src/index.tsx`
- Find DataStar usage: `rg -n "data-on:" src`
- Find bknd API calls: `rg -n "api\.data\." src`

## Definition of Done

Before PR:
- [ ] Run `bun run typegen` (ensures types are up to date)
- [ ] Run `bun run build:css` (ensures CSS compiles)
- [ ] No TypeScript errors (`tsc --noEmit` equivalent via IDE)
- [ ] Follows JSX pragma convention (`/** @jsxImportSource hono/jsx */`)
- [ ] Uses `class` not `className` in JSX
