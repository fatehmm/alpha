import { Suspense } from "react";
import { getSessionQueryOptions } from "@/query-options/user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/layout/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute("/_main")({
  component: MainLayout,
  beforeLoad: async () => {
    const session = await authClient.getSession();

    if (!session.data) {
      throw redirect({
        href: "/login",
        throw: true,
      });
    }
  },
  loader: async ({ context: { queryClient } }) => {
    const session = await authClient.getSession();
    if (session.data) {
      try {
        await queryClient.ensureQueryData(getSessionQueryOptions);
      } catch (error) {
        console.error("Failed to load session data:", error);
        // If session data loading fails, redirect to login
        throw redirect({
          href: "/login",
          throw: true,
        });
      }
    }
  },
  pendingComponent: () => (
    <Spinner size="lg" className="grid grow place-items-center" />
  ),
});

function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6 lg:px-6">
              <ScrollArea className="h-[calc(100dvh-124px)]" type="auto">
                <Suspense
                  fallback={
                    <Spinner
                      size="lg"
                      className="grid h-[calc(100dvh-124px)] grow place-items-center"
                    />
                  }
                >
                  <Outlet />
                </Suspense>
              </ScrollArea>
            </div>
          </div>

          <Toaster />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
