// A small static web server that behaves like GitHub Pages / Vercel for a built site:
// folders serve their index.html, unknown paths get 404.html with status 404.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".gif": "image/gif",
  ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf", ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml", ".pdf": "application/pdf", ".mp4": "video/mp4", ".webm": "video/webm",
};

/** Which file answers a request path, the way GitHub Pages / Vercel would: folders serve their
 *  index.html, "/about" also finds about.html, unknown paths get 404.html with status 404. */
export function resolveFile(root, pathname) {
  root = path.resolve(root);
  let file = path.join(root, decodeURIComponent(pathname));
  if (!file.startsWith(root)) return { status: 403 };
  try {
    if (fs.statSync(file).isDirectory()) {
      if (!pathname.endsWith("/")) return { status: 301, location: pathname + "/" };
      file = path.join(file, "index.html");
    }
  } catch { /* not found: handled below */ }
  if (!fs.existsSync(file) && fs.existsSync(file + ".html")) file += ".html";
  if (fs.existsSync(file) && fs.statSync(file).isFile()) return { status: 200, file, type: TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream" };
  const nf = path.join(root, "404.html");
  return fs.existsSync(nf) ? { status: 404, file: nf, type: TYPES[".html"] } : { status: 404 };
}

export function startServer(root, port = 0) {
  root = path.resolve(root);
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://x");
    const r = resolveFile(root, url.pathname);
    if (r.status === 301) { res.writeHead(301, { Location: r.location + url.search }); return res.end(); }
    if (!r.file) { res.writeHead(r.status, { "Content-Type": "text/plain" }); return res.end(r.status === 404 ? "Not found" : ""); }
    res.writeHead(r.status, { "Content-Type": r.type });
    fs.createReadStream(r.file).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, "127.0.0.1", () => {
    resolve({ url: `http://${"127.0.0.1"}:${server.address().port}`, close: () => new Promise((r) => server.close(r)) });
  }));
}
