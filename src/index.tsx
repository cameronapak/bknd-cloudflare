import { serve } from "bknd/adapter/cloudflare";
import config from "../config";
import { Layout } from "./layouts";
import { Home } from "./pages/home";
import type { Context } from "hono";

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
      const url = new URL(c.req.url);
      const host = url.origin;
      return c.render(<Home host={host} />, {
        title: 'Home',
        description: 'This is the home page.',
      });
    }); 
  },
});
