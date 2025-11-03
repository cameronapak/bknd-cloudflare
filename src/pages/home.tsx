/** @jsxImportSource hono/jsx */
import { Prose } from '../components/prose'

export function Home({ todos = [] }: { todos?: BkndEntity<"todos">[] | undefined }) {
  return (
    <section class="m-6">
      <Prose>
        <h1>Todos</h1>
        <ol>
          {!("error" in todos) && Array.isArray(todos) && (todos || [])?.map((todo) => (
            <li key={todo.id} class="flex items-center gap-2">
              <input
                type="checkbox"
                class="checkbox checkbox-primary"
              />
              <span>{todo.title}</span>
            </li>
          ))}
        </ol>
        <a href="/admin" class="btn btn-primary">Admin</a>
      </Prose>
    </section>
  )
}
