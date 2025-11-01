/** @jsxImportSource hono/jsx */
import { Prose } from '../components/prose'

export function Home() {
  return (
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
        <button class="btn btn-primary">Click me</button>
      </Prose>
    </section>
  )
}
