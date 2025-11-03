import { serve } from "bknd/adapter/cloudflare";
import type { Context } from "hono";
import { Api } from "bknd/client";
import config from "../config";
import { Layout } from "./layouts";
import { Home } from "./pages/home";
import { App } from "bknd";

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
      const todos = await api.data.readMany("todos");

      return c.render(<Home todos={todos} />, {
        title: 'Home',
        description: 'This is the home page.',
      });
    }); 
  },
});
