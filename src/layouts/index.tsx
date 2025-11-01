/** @jsxImportSource hono/jsx */
import type { FC } from 'hono/jsx'

export const Layout: FC<{ children: any, title: string, description: string }> = ({ children, title, description }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>{title}</title>
      <meta name='description' content={description} />
      <link href="./styles/global.css" rel="stylesheet" />
    </head>
    <body>
      {children}
    </body>
  </html>
)
