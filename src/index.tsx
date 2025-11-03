import { serve } from "bknd/adapter/cloudflare";
import type { Context } from "hono";
import { Api } from "bknd/client";
import config from "../config";
import { Layout } from "./layouts";
import { Home } from "./pages/home";

function getBkndApi(c: Context) {
  const url = new URL(c.req.url);
  const host = url.origin;
  return new Api({
    host,
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
      const api = getBkndApi(c);
      const todos = await api.data.readMany("todos");

      return c.render(<Home todos={todos} />, {
        title: 'Home',
        description: 'This is the home page.',
      });
    }); 
  },
});
