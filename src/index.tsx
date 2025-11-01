import { serve } from "bknd/adapter/cloudflare";
import config from "../config";
import { Layout } from "./layouts";

export default serve({
  ...config,
  onBuilt: async (app) => {
    /** Metadata Hoisting @see https://hono.dev/docs/guides/jsx#metadata-hoisting */
    app.server.use('*', async (c, next) => {
      c.setRenderer((content) => {
        return c.html(
          <Layout>
            {content}
          </Layout>
        )
      })
      await next()
    })

    app.server.get("/", (c) => c.render(
      <>
        <title>Home</title>
        <meta name='description' content='This is the home page.' />
        <h1>Hello World</h1>
      </>
    )); 
  },
});
