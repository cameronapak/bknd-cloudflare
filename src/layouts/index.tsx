/** @jsxImportSource hono/jsx */
import type { FC, CSSProperties } from 'hono/jsx'

export const Layout: FC<{ children: any, title: string, description: string }> = ({ children, title, description }) => (
  <html lang="en" class="wa-cloak">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      {/* <script src="https://kit.webawesome.com/b48c3e538f534567.js" crossorigin="anonymous"></script> */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <link href="./styles/global.css" rel="stylesheet" />
    </head>
    <body
      class="bg-gray-500"
      style={{
        padding: 'var(--wa-space-m)',
      } as CSSProperties}
    >
      {children}
    </body>
  </html>
)
