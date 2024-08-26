import { createRouteHandler } from "uploadthing/next";
import { uploadRouter } from "./core";

export const runtime = "nodejs";
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: uploadRouter,

  // config: { ... },
});
