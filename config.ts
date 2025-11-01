import type { CloudflareBkndConfig } from "bknd/adapter/cloudflare";
import { showRoutes } from "bknd/plugins";

export default {
   d1: {
      session: true,
   },
   options: {
      plugins: [showRoutes()],
   },
   adminOptions: {
      adminBasepath: "/admin",
      logoReturnPath: "../..",
   }
} satisfies CloudflareBkndConfig;
