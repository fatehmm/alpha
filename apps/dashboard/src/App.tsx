import { createRouter, RouterProvider } from "@tanstack/react-router";

import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";

import { queryClient, trpc, trpcClient } from "./lib/trpc";
import { routeTree } from "./route-tree.gen";

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
