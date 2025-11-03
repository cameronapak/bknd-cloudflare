import type { Context } from "hono";

declare module 'hono' {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      head: { title: string, description: string }
    ): Response | Promise<Response>
  }
}
