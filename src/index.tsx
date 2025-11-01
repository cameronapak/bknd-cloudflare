import { serve } from "bknd/adapter/cloudflare";
import config from "../config";
import { Layout } from "./layouts";
import { Prose } from "./components/prose";

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

    app.server.get("/", (c) => c.render((
      <section class="m-6">
        <Prose>
          <h1>Garlic bread with cheese: What the science tells us</h1>
          <p>
            For years parents have espoused the health benefits of eating garlic bread with cheese to their
            children, with the food earning such an iconic status in our culture that kids will often dress
            up as warm, cheesy loaf for Halloween.
          </p>
          <p>
            But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
            springing up around the country.
          </p>
        </Prose>
      </section>
    ), {
      title: 'Home',
      description: 'This is the home page.',
    })); 
  },
});
