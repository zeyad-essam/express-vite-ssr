import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export async function render({ path }) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>
  );
}
