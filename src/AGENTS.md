# src/AGENTS.md

## Package Identity

Frontend + backend in one: Hono JSX components for server-side rendering, DataStar for progressive enhancement, bknd.io API for data operations. All routes and components live in `src/`.

## Setup & Run

- Dev server: `bun run dev` (from root - runs CSS watch + wrangler dev)
- Build CSS: `bun run build:css` (from root)
- Type generation: `bun run typegen` (from root - generates `bknd-types.d.ts`)
- No separate install needed (use root `bun install`)

## Patterns & Conventions

### File Organization

- **Routes**: `src/index.tsx` - All route handlers in `onBuilt` callback
- **Pages**: `src/pages/` - Page components (e.g., `home.tsx`)
- **Components**: `src/components/` - Reusable components (e.g., `prose.tsx`)
- **Layouts**: `src/layouts/` - Layout wrappers (e.g., `index.tsx`)
- **Styles**: `src/styles/global.css` - Tailwind + DaisyUI config

### JSX Patterns

✅ **DO**: Include JSX pragma at top of every `.tsx` file
```1:1:src/pages/home.tsx
/** @jsxImportSource hono/jsx */
```

✅ **DO**: Use `class` not `className` (Hono JSX uses HTML attributes)
```6:6:src/pages/home.tsx
    <section class="m-6">
```

✅ **DO**: Use `FC` type from `hono/jsx` for component props
```4:4:src/layouts/index.tsx
export const Layout: FC<{ children: any, title: string, description: string }> = ({ children, title, description }) => (
```

✅ **DO**: Function components returning JSX
```4:4:src/components/prose.tsx
export const Prose: FC<{ children: any, class?: string }> = ({ children, class: className = '' }) => (
```

❌ **DON'T**: Use `className` (will not work with Hono JSX)
❌ **DON'T**: Omit JSX pragma (will break JSX compilation)

### DataStar Patterns

✅ **DO**: Use `data-on:submit` for form submissions
```9:9:src/pages/home.tsx
        <form data-on:submit="@post('/todos', {contentType: 'form'})" class="mb-4">
```

✅ **DO**: Use `data-on:click` for button interactions
```33:33:src/pages/home.tsx
        <button data-on:click="alert('I'm sorry, Dave. I'm afraid I can't do that.')" class="btn btn-secondary">Click me</button>
```

✅ **DO**: Use `ServerSentEventGenerator.stream()` for SSE responses with DOM updates
```58:73:src/index.tsx
      return ServerSentEventGenerator.stream(async (stream) => {
        const todoElement = `<li id="todo-${todo.id}" class="flex items-center gap-2">
          <input type="checkbox" class="checkbox checkbox-primary" />
          <span>${todo.title}</span>
        </li>`;
        
        stream.patchElements(todoElement, {
          selector: "#todos-list",
          mode: "append",
        });
        
        stream.patchElements('<input data-init="el.focus()" type="text" name="title" placeholder="Add a todo..." class="input input-bordered flex-1" required value="" />', {
          selector: 'input[name="title"]',
          mode: "replace",
        });
      });
```

### API Patterns

✅ **DO**: Use `getBkndApi()` helper to access bknd API in routes
```16:21:src/index.tsx
function getBkndApi(app: App, c: Context) {
  return new Api({
    fetcher: app.server.request as typeof fetch,
    request: c.req.raw,
  });
}
```

✅ **DO**: Create routes in `onBuilt` callback using `app.server.get/post/etc`
```38:46:src/index.tsx
    app.server.get("/", async(c: Context) => {
      const api = getBkndApi(app, c);
      const todos = await api.data.readMany("todos");

      return c.render(<Home todos={todos} />, {
        title: 'Home',
        description: 'This is the home page.',
      });
    });
```

✅ **DO**: Use `c.render()` for page responses with metadata
✅ **DO**: Use `c.json()` for JSON API responses
✅ **DO**: Parse form bodies with `c.req.parseBody()`
```50:50:src/index.tsx
      const body = await c.req.parseBody();
```

✅ **DO**: Return error responses as `c.json({error: msg}, status)`
```53:53:src/index.tsx
        return c.json({ error: "Title is required" }, 400);
```

### Styling Patterns

✅ **DO**: Use Tailwind utility classes + DaisyUI component classes
```15:15:src/pages/home.tsx
              class="input input-bordered flex-1"
```

✅ **DO**: Use DaisyUI classes like `btn`, `btn-primary`, `checkbox`, `checkbox-primary`
```18:18:src/pages/home.tsx
            <button type="submit" class="btn btn-primary">Add</button>
```

### Type Patterns

✅ **DO**: Use auto-generated types from `bknd-types.d.ts` (never edit manually)
```4:4:src/pages/home.tsx
export function Home({ todos = [] }: { todos?: BkndEntity<"todos">[] | undefined }) {
```

✅ **DO**: Use `import type` for type-only imports
```2:2:src/index.tsx
import type { Context } from "hono";
```

## Touch Points / Key Files

- **Main entry**: `src/index.tsx` - Routes, API handlers, `getBkndApi()` helper
- **Runtime config**: `../config.ts` - bknd configuration (auth, D1, R2, plugins)
- **Typegen config**: `../bknd.config.ts` - Wrapped config for type generation
- **Layout**: `src/layouts/index.tsx` - Base HTML layout with DataStar script
- **Styles**: `src/styles/global.css` - Tailwind + DaisyUI theme config
- **Example page**: `src/pages/home.tsx` - Shows DataStar form + component patterns
- **Example component**: `src/components/prose.tsx` - Simple reusable component pattern

## JIT Index Hints

- Find a page component: `rg -n "export function .*" src/pages`
- Find a reusable component: `rg -n "export const .*" src/components`
- Find a route handler: `rg -n "app\.server\.(get|post|put|delete)" src/index.tsx`
- Find DataStar usage: `rg -n "data-on:" src`
- Find bknd API calls: `rg -n "api\.data\." src/index.tsx`
- Find SSE streaming: `rg -n "ServerSentEventGenerator" src`

## Common Gotchas

- **JSX pragma required**: Every `.tsx` file MUST start with `/** @jsxImportSource hono/jsx */` or JSX won't compile
- **Use `class` not `className`**: Hono JSX uses HTML attributes directly, not React props
- **DataStar syntax**: Attributes use colons (`data-on:click` not `data-on-click`)
- **Type generation**: Run `bun run typegen` after schema changes to update `bknd-types.d.ts`
- **Metadata hoisting**: Use `c.render()` with metadata object for page titles/descriptions (see `src/index.tsx` line 42-45)
- **Relative imports**: Use relative paths (`../components/prose`), no path aliases configured

## Pre-PR Checks

Run from project root:
```bash
bun run typegen && bun run build:css
```

Ensures types are generated and CSS compiles before PR.

