/** @jsxImportSource hono/jsx */
import type { FC } from 'hono/jsx'

export const Prose: FC<{ children: any, class?: string }> = ({ children, class: className = '' }) => (
  <div class={`prose ${className}`}>
    {children}
  </div>
)
