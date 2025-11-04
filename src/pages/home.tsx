/** @jsxImportSource hono/jsx */
import { Prose } from '../components/prose'

export function Home({ todos = [] }: { todos?: BkndEntity<"todos">[] | undefined }) {
  return (
    <section class="m-6">
      <Prose>
        <h1>Todos</h1>
        <form data-on:submit="@post('/todos', {contentType: 'form'})" class="mb-4">
          <div class="flex gap-2">
            <input
              type="text"
              name="title"
              placeholder="Add a todo..."
              class="input input-bordered flex-1"
              required
            />
            <button type="submit" class="btn btn-primary">Add</button>
          </div>
        </form>
        <ol id="todos-list">
          {!("error" in todos) && Array.isArray(todos) && (todos || [])?.map((todo) => (
            <form key={todo.id}>
              <li id={`todo-${todo.id}`} class="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="completed"
                  data-on:change={`@put('/todos/${todo.id}', {contentType: 'form'})`}
                  class="checkbox checkbox-primary"
                  checked={!!todo.completed_datetime}
                />
                <span>{todo.title}</span>
                <button
                  data-on:click={`@delete('/todos/${todo.id}')`}
                  class="btn btn-square btn-ghost"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </li>
            </form>
          ))}
        </ol>
        <a href="/admin" class="btn btn-primary">Admin</a>
        <button data-on:click="alert('I'm sorry, Dave. I'm afraid I can't do that.')" class="btn btn-secondary">Click me</button>
      </Prose>
    </section>
  )
}
