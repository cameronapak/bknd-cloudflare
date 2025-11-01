import type { CloudflareBkndConfig } from "bknd/adapter/cloudflare";
import { showRoutes } from "bknd/plugins";

export default {
   config: {
      auth: {
         enabled: true,
         jwt: {
            secret: "jesus-saves"
         },
      }
   },
   d1: {
      session: true,
   },
   options: {
      plugins: [showRoutes()],
      mode: "db",
   },
   adminOptions: {
      adminBasepath: "/admin",
      logoReturnPath: "../..",
   }
} satisfies CloudflareBkndConfig;
