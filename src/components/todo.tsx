/** @jsxImportSource hono/jsx */
import type { FC } from 'hono/jsx';

export const Todo: FC<{ todo: BkndEntity<"todos">, class?: string }> = ({ 
  todo, 
  class: className = "flex items-center gap-2" 
}) => {
  return (
    <form id={`todo-${todo.id}`} key={todo.id}>
      <li class={className}>
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
  );
};

