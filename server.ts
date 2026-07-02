import { serve } from "bun";
import { join } from "path";

const BASE = import.meta.dir;

serve({
  port: Number(process.env.PORT) || 4050,
  async fetch(req) {
    const url = new URL(req.url);
    let filePath = join(BASE, url.pathname === "/" ? "index.html" : url.pathname);
    const file = Bun.file(filePath);
    if (await file.exists()) {
      return new Response(file);
    }
    return new Response("Not Found", { status: 404 });
  },
});
console.log("GreenUp demo server running on port", Number(process.env.PORT) || 4050);
