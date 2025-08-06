import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack";

export default defineConfig({
  plugins: [pluginReact()],
	// Removed mkcert() for now to get to know the project
  server: {
    port: 5173,
    strictPort: true,
    host: "localhost",
  },
  tools: {
    rspack: {
      plugins: [
        TanStackRouterRspack({
          target: "react",
          autoCodeSplitting: true,
          generatedRouteTree: "src/route-tree.gen.ts",
        }),
      ],
    },
  },
});
