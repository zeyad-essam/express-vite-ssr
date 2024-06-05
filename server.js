import path from "path";
import { fileURLToPath } from "url";
import fsp from "fs/promises";
import express from "express";
import { installGlobals } from "@remix-run/node";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Polyfill Web Fetch API
installGlobals();

const root = process.cwd();
const isProduction = process.env.NODE_ENV === "production";
const Base = process.env.BASE || "/";

const ssrManifest = isProduction
  ? await fsp.readFile("./dist/client/ssr-manifest.json", "utf-8")
  : undefined;

function resolve(p) {
  return path.resolve(__dirname, p);
}

const createServer = async () => {
  const app = express();
  let vite;

  if (!isProduction) {
    vite = await createViteServer({
      root,
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    const sirv = (await import("sirv")).default;
    const compression = (await import("compression")).default;
    app.use(compression());
    app.use(
      Base,
      sirv("./dist/client", {
        extensions: [],
        gzip: true,
      })
    );
  }

  app.get("/api/test", (req, res, next) => {
    res.json({
      message: "message fetched successfully!",
    });
  });

  app.use("*", async (req, res) => {
    const url = req.originalUrl;

    // ! Favicon Fix
    if (url === "/favicon.ico") {
      return res.sendFile(path.resolve("./public/vite.svg"));
    }

    try {
      let template;
      let render;

      if (!isProduction) {
        template = await fsp.readFile(resolve("index.html"), "utf8");
        template = await vite.transformIndexHtml(url, template);
        render = await vite
          .ssrLoadModule("src/entry.server.jsx")
          .then((m) => m.render);
      } else {
        template = await fsp.readFile(
          resolve("./dist/client/index.html"),
          "utf8"
        );
        render = (await import("./dist/server/entry.server.js")).render;
      }

      try {
        const rendered = await render({ path: req.originalUrl }, ssrManifest);
        const html = template.replace(`<!--app-html-->`, rendered ?? "");

        return res.status(200).setHeader("Content-Type", "text/html").end(html);
      } catch (e) {
        if (e instanceof Response && e.status >= 300 && e.status <= 399) {
          return res.redirect(e.status, e.headers.get("Location"));
        }
        throw e;
      }
    } catch (error) {
      if (!isProduction) {
        vite.ssrFixStacktrace(error);
      }
      console.log(error.stack);
      res.status(500).end(error.stack);
    }
  });

  app.listen(3000, () => {
    console.log("HTTP server is running at http://localhost:3000");
  });
};

createServer();
