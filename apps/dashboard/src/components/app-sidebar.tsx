import * as React from "react";
import {
  IconBell,
  IconDashboard,
  IconHelpOctagon,
  IconLayoutDashboard,
  IconSettings,
  IconWorld,
} from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "./logo";
import { NavUser } from "./nav-user";
import { Badge } from "./ui/badge";

const navMain = [
  {
    title: "Services",
    url: "services",
    icon: IconLayoutDashboard,
  },
  {
    title: "Projects",
    url: "projects",
    icon: IconDashboard,
  },
  {
    title: "Domains",
    url: "domains",
    icon: IconWorld,
    isNew: true,
  },
  ...(import.meta.env.MODE !== "production"
    ? [
        {
          title: "Quizes",
          url: "quizes",
          icon: IconHelpOctagon,
          isNew: false,
        },
      ]
    : []),
  {
    title: "Notifications",
    url: "notifications",
    icon: IconBell,
  },
  {
    title: "Account",
    url: "account/general",
    icon: IconSettings,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mb-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-between">
            <SidebarMenuButton
              asChild
              className="size-auto data-[slot=sidebar-menu-button]:!p-1.5 [&>svg]:size-auto"
            >
              <Link to="/">
                <Logo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <Link
                      to={"/" + item.url}
                      activeProps={{
                        "data-active": true,
                      }}
                      activeOptions={{ exact: false }}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      {item.isNew && (
                        <Badge variant="destructive" className="ml-auto">
                          New
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
