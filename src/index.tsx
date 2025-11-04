import { serve } from "bknd/adapter/cloudflare";
import type { Context } from "hono";
import { Api } from "bknd/client";
import { App } from "bknd";
import { ServerSentEventGenerator } from "@starfederation/datastar-sdk/web";

import config from "../config";
import { Layout } from "./layouts";
import { Home } from "./pages/home";

/**
 * The Api class is the main entry point for interacting with the bknd API.
 * 
 * @see https://docs.bknd.io/usage/sdk/#using-a-local-api
 */
function getBkndApi(app: App, c: Context) {
  return new Api({
    fetcher: app.server.request as typeof fetch,
    request: c.req.raw,
  });
}

export default serve({
  ...config,
  onBuilt: async (app) => {
    /** Metadata Hoisting @see https://hono.dev/docs/guides/jsx#metadata-hoisting */
    app.server.use('*', async (c: Context, next) => {
      c.setRenderer((content, head) => {
        return c.html(
          <Layout title={head.title} description={head.description}>
            {content}
          </Layout>
        )
      })
      await next()
    })

    app.server.get("/", async(c: Context) => {
      const api = getBkndApi(app, c);
      const todos = await api.data.readMany("todos", {
        limit: 100,
        sort: "-created_datetime",
      });

      return c.render(<Home todos={todos} />, {
        title: 'Home',
        description: 'This is the home page.',
      });
    });

    app.server.post("/todos", async(c: Context) => {
      const api = getBkndApi(app, c);
      const body = await c.req.parseBody();
      const title = body.title as string;
      if (!title) {
        return c.json({ error: "Title is required" }, 400);
      }

      const todo = await api.data.createOne("todos", { title, created_datetime: new Date() });

      return ServerSentEventGenerator.stream(async (stream) => {        
        // Add new todo to the top of the list
        stream.patchElements((
          <li id={`todo-${todo.id}`} class="not-prose flex items-center gap-2"  >
            <input type="checkbox" class="checkbox checkbox-primary" />
            <span>{todo.title}</span>
            <button
              data-on:click={`@delete('/todos/${todo.id}')`}
              class="btn btn-square btn-ghost"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </li>
        ).toString(), {
          selector: "#todos-list",
          mode: "prepend",
        });
        
        stream.patchElements((
          <input
            data-init="el.focus()" 
            type="text" 
            name="title" 
            placeholder="Add another todo..." 
            class="input input-bordered flex-1" 
            required 
            value="" />
        ).toString(), {
          selector: 'input[name="title"]',
          mode: "replace",
        });
      });
    });

    app.server.put("/todos/:id", async (c: Context) => {
      const api = getBkndApi(app, c);
      const id = c.req.param("id");

      const body = await c.req.parseBody();
      const completed = body.completed === "on" || body.completed === "true";
      const todo = await api.data.updateOne("todos", id, {
        // @ts-ignore - I want to send null here, which is entirely valid
        completed_datetime: completed ? new Date() : null,
      });

      return ServerSentEventGenerator.stream(async (stream) => {
        stream.patchElements(
          (
            <li id={`todo-${todo.id}`} class="flex items-center gap-2">
              <input
                type="checkbox"
                name="completed"
                data-on:change={`@put('/todos/${todo.id}', {contentType: 'form'})`}
                class="checkbox checkbox-primary"
                checked={!!todo.completed_datetime}
              />
              <span>{todo.title}</span>
            </li>
          ).toString(),
          {
            selector: `#todo-${id}`,
            mode: "replace",
          }
        );
      });
    });

    app.server.delete("/todos/:id", async (c: Context) => {
      const api = getBkndApi(app, c);
      const id = c.req.param("id");

      await api.data.deleteOne("todos", id);

      return ServerSentEventGenerator.stream(async (stream) => {
        stream.patchElements("", {
          selector: `#todo-${id}`,
          mode: "remove",
        });
      });
    });
  },
});
