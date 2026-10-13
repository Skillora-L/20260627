const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "dist");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml",
  ".pdf": "application/pdf", ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".mp4": "video/mp4"
};

http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    return res.end();
  }
  let url;
  try { url = decodeURIComponent(req.url.split("?")[0]); }
  catch { res.writeHead(400); return res.end(); }
  const filePath = path.resolve(root, url === "/" ? "index.html" : `.${url}`);
  const relative = path.relative(root, filePath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }
  fs.stat(filePath, (error, stat) => {
    if (error || !stat.isFile()) { res.writeHead(404); return res.end("Not found"); }
    const headers = { "Content-Type": types[path.extname(filePath)] || "application/octet-stream", "Accept-Ranges": "bytes" };
    let start = 0;
    let end = stat.size - 1;
    let status = 200;
    if (req.headers.range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if (!match || (!match[1] && !match[2])) {
        res.writeHead(416, { "Content-Range": `bytes */${stat.size}` }); return res.end();
      }
      if (!match[1]) start = Math.max(0, stat.size - Number(match[2]));
      else { start = Number(match[1]); if (match[2]) end = Math.min(end, Number(match[2])); }
      if (start > end || start >= stat.size) {
        res.writeHead(416, { "Content-Range": `bytes */${stat.size}` }); return res.end();
      }
      status = 206;
      headers["Content-Range"] = `bytes ${start}-${end}/${stat.size}`;
    }
    headers["Content-Length"] = stat.size ? end - start + 1 : 0;
    res.writeHead(status, headers);
    if (req.method === "HEAD" || !stat.size) return res.end();
    const stream = fs.createReadStream(filePath, { start, end });
    stream.on("error", () => res.destroy());
    res.on("close", () => stream.destroy());
    stream.pipe(res);
  });
}).listen(port, "127.0.0.1", () => console.log(`Preview: http://127.0.0.1:${port}`));
