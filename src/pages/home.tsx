/** @jsxImportSource hono/jsx */
import { Todos } from '../../bknd-types';
import { Prose } from '../components/prose'
import { Api } from "bknd/client";

export async function Home() {
  const api = new Api({
    host: "http://localhost:8787",
  });
  const todos = await api.data.readMany("todos");

  return (
    <section class="m-6">
      <Prose>
        <h1>Garlic bread with cheese: What the science tells us</h1>
        <ol>
          {!("error" in todos) && (todos ?? [])?.map((todo) => (
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
