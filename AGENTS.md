# AGENTS.md

## Setup commands

- Install deps: `bun install`
- Start dev server: `bun run dev` (runs CSS watch + wrangler dev)
- Generate types: `bun run typegen` (generates both wrangler and bknd types)
- Build CSS: `bun run build:css`
- Deploy: `bun run deploy`

## Tech stack

- **bknd.io** - Backend framework, configured in `config.ts`
- **Hono** - Web server with JSX components (not React)
- **DataStar** - Progressive enhancement via HTML attributes
- **Tailwind CSS v4** - CSS framework configured in `src/styles/global.css`
- **DaisyUI** - Component library with custom "cam" theme
- **Cloudflare Workers** - Runtime platform
- **bun** - Package manager and runtime

## Code style

### Hono.jsx components

- Always include `/** @jsxImportSource hono/jsx */` at the top of component files
- Use `class` not `className` for HTML attributes
- Import types from `hono/jsx`: `import type { FC } from 'hono/jsx'`
- Components are functions that return JSX
- Example pattern:
```tsx
/** @jsxImportSource hono/jsx */
import type { FC } from 'hono/jsx'

export const Component: FC<{ prop: string }> = ({ prop }) => (
  <div class="...">{prop}</div>
)
```

### TypeScript

- Strict mode enabled
- JSX import source is `hono/jsx` (configured in tsconfig.json)
- Type definitions auto-generated: `bknd-types.d.ts`, `worker-configuration.d.ts`, `index.d.ts`
- Use `BkndEntity<"collection">` type for bknd data entities

### DataStar patterns

- Use `data-on:submit`, `data-on:click` attributes for interactions
- Format: `data-on:submit="@post('/route', {contentType: 'form'})"`
- For SSE streams, use `ServerSentEventGenerator.stream()` in route handlers
- Use `stream.patchElements()` for DOM updates

### Route definition

- Routes defined in `src/index.tsx` inside `onBuilt` callback
- Use `app.server.get()`, `app.server.post()`, etc.
- Get bknd API instance: `const api = getBkndApi(app, c)`
- Use `c.render()` with JSX component and metadata object
- Use `c.html()` for full HTML responses
- Use `c.json()` for JSON responses

## Build process

1. **CSS**: Tailwind compiles `src/styles/global.css` → `dist/styles/global.css`
2. **Assets**: `bun run bknd:copy-assets` copies admin assets to `dist/`
3. **Types**: `bun run typegen` generates:
   - Wrangler types (D1, R2 bindings)
   - Bknd types (collections, entities)
4. **Dev**: `predev` script runs asset copy + typegen before dev server

## Important patterns

### Config separation

- `config.ts` - Main bknd config (imported by worker)
- `bknd.config.ts` - Wrapped with `withPlatformProxy` for type generation
- Never import `bknd.config.ts` in worker code (wrangler gets bundled)

### Metadata hoisting

- Layout wrapper uses Hono's metadata hoisting pattern
- Set global renderer with `c.setRenderer()` in middleware
- Pass `title` and `description` via `c.render()` metadata object

### Component structure

- `src/components/` - Reusable components
- `src/layouts/` - Layout wrappers
- `src/pages/` - Page components
- Components use Tailwind + DaisyUI classes

### DataStar attributes

- Forms: `data-on:submit="@post('/route', {contentType: 'form'})"`
- Buttons: `data-on:click="..."`
- Elements need IDs for patching: `id="todos-list"`
- Use `data-init="el.focus()"` for client-side initialization

## File conventions

- Components: `.tsx` files with Hono.jsx pragma
- Config: `config.ts` for worker, `bknd.config.ts` for typegen
- Styles: `src/styles/global.css` (Tailwind v4 with plugin syntax)
- Output: `dist/` directory for built assets
- Types: Auto-generated in root, don't edit manually

## Testing

No test suite currently configured. Add tests if needed.

## Deployment

- `bun run deploy` uses `wrangler deploy`
- Assets in `dist/` are served via Cloudflare Workers
- D1 database binding: `bknd_nov_2025_d1`
- R2 bucket binding: `bknd_nov_2025_r2`
- Admin UI available at `/admin` (from bknd)

## Common gotchas

- CSS must be built before deployment (included in dist/)
- Type generation requires `PROXY=1` env var for bknd types
- `bknd.config.ts` uses proxy wrapper, `config.ts` is the real config
- Hono uses `class` not `className` in JSX
- DataStar script loaded from CDN in Layout component
- Route handlers must use `getBkndApi()` helper to access bknd API
- SSE streams return `ServerSentEventGenerator.stream()` not regular responses

