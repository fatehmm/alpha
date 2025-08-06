"use client";

import { getSessionQueryOptions } from "@/query-options/user";
import { IconLogout, IconSelector } from "@tabler/icons-react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "../lib/auth-client";
import { Spinner } from "./ui/spinner";

export function NavUser() {
  const { data } = useSuspenseQuery(getSessionQueryOptions);

  const { mutate: logoutMutation, isPending } = useMutation({
    mutationFn: () => authClient.signOut(),
    onSuccess: () => {
      redirect({ href: "/login" });
    },
  });

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={data.user.image || ""}
                  alt={data.user.name}
                />
                <AvatarFallback className="rounded-lg">
                  {data.user.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {data.user.name}
                </span>
                <span className="truncate text-xs">{data.user.email}</span>
              </div>
              <IconSelector className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="bottom"
            align="center"
            sideOffset={4}
          >
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
                logoutMutation();
              }}
              disabled={isPending}
            >
              <IconLogout />
              Log out
              {isPending && <Spinner size="sm" className="ml-auto" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
