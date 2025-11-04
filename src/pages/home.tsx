/** @jsxImportSource hono/jsx */
import { Prose } from '../components/prose'
import { Todo } from '../components/todo'

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
            <Todo key={todo.id} todo={todo} />
          ))}
        </ol>
        <a href="/admin" class="btn btn-primary">Admin</a>
        <button data-on:click="alert('I'm sorry, Dave. I'm afraid I can't do that.')" class="btn btn-secondary">Click me</button>
      </Prose>
    </section>
  )
}
