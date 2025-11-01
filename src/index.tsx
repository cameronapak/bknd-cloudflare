import { serve } from "bknd/adapter/cloudflare";
import config from "../config";
import { Layout } from "./layouts";
import { Home } from "./pages/home";

export default serve({
  ...config,
  onBuilt: async (app) => {
    /** Metadata Hoisting @see https://hono.dev/docs/guides/jsx#metadata-hoisting */
    app.server.use('*', async (c, next) => {
      c.setRenderer((content, head) => {
        return c.html(
          <Layout title={head.title} description={head.description}>
            {content}
          </Layout>
        )
      })
      await next()
    })

    app.server.get("/", (c) => c.render(<Home />, {
      title: 'Home',
      description: 'This is the home page.',
    })); 
  },
});
