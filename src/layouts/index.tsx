/** @jsxImportSource hono/jsx */
import type { FC } from 'hono/jsx'

export const Layout: FC<{ children: any, title: string, description: string }> = ({ children, title, description }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>{title}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      <meta name='description' content={description} />
      <link href="./styles/global.css" rel="stylesheet" />
    </head>
    <body>
      {children}
    </body>
  </html>
)
