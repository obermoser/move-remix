import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "@fontsource/poppins/index.css";
import "./tailwind.css";
import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png"
    }
  ]
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <nav className="px-10 pt-5">
            <Link className="text-2xl font-semibold" to="/" prefetch="intent">
              <h1>
                Move<span className="text-teal-500">DB</span>
              </h1>
            </Link>
          </nav>
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
