// Local verification server only. Never deployed; production still serves dist directly.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

export async function startServer(port = 0) {
  const root = path.resolve("dist");
  const server = http.createServer((req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      if (url.pathname === "/__fixtures/changed-analysis.js") {
        res.setHeader("Content-Type", "text/javascript");
        res.end(
          `window.FIELDWORK_ANALYSIS = ${fs.readFileSync("tests/fixtures/changed-analysis.json", "utf8")};`,
        );
        return;
      }
      const pathname = decodeURIComponent(url.pathname);
      const file = path.resolve(
        root,
        "." + (pathname === "/" ? "/index.html" : pathname),
      );
      if (!file.startsWith(root + path.sep)) {
        res.writeHead(403).end();
        return;
      }
      let content = fs.readFileSync(file);
      if (
        pathname === "/app.html" &&
        url.searchParams.get("fixture") === "changed"
      ) {
        content = content
          .toString()
          .replace(
            'src="fieldwork-analysis.js"',
            'src="/__fixtures/changed-analysis.js"',
          );
      }
      res.setHeader(
        "Content-Type",
        {
          ".html": "text/html",
          ".js": "text/javascript",
          ".css": "text/css",
          ".svg": "image/svg+xml",
          ".pdf": "application/pdf",
        }[path.extname(file)] || "application/octet-stream",
      );
      res.end(content);
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
  return { server, base: `http://127.0.0.1:${server.address().port}` };
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  const { base } = await startServer(Number(process.env.PORT || 8766));
  console.log(
    `Fieldwork: ${base}/app.html\nChanged test result: ${base}/app.html?fixture=changed\nStop with Ctrl+C.`,
  );
}
