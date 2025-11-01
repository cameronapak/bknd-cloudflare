/** @jsxImportSource hono/jsx */
import { Prose } from '../components/prose'
import { Api } from "bknd/client";

export async function Home({ host }: { host: string }) {
  const api = new Api({
    host,
  });
  const todos = await api.data.readMany("todos");

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
        {("error" in todos) && (
          <p>Error: {todos.status} {todos.error}</p>
        )}
        <a href="/admin" class="btn btn-primary">Admin</a>
      </Prose>
    </section>
  )
}
