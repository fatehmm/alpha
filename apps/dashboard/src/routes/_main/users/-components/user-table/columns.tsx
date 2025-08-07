"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal, Shield, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  role: string | null;
  banned: boolean | null;
  banReason?: string | null;
  banExpires?: string | null;
  createdAt: string;
  updatedAt: string;
};

interface UserTableProps {
  onDelete: (userId: string) => void;
  onEditPermissions: (userId: string) => void;
  isDeleting: boolean;
}

export const createColumns = ({
  onDelete,
  onEditPermissions,
  isDeleting,
}: UserTableProps): ColumnDef<User>[] => [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback className="text-xs font-medium">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-muted-foreground text-xs">{user.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string | null;
      if (!role)
        return <span className="text-muted-foreground text-sm">-</span>;

      const roleColors = {
        admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        user: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        moderator:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      };

      const colorClass =
        roleColors[role as keyof typeof roleColors] ||
        "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";

      return (
        <Badge className={`text-xs font-medium ${colorClass}`}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "banned",
    header: "Status",
    cell: ({ row }) => {
      const banned = row.getValue("banned") as boolean | null;

      if (banned === null)
        return <span className="text-muted-foreground text-sm">-</span>;

      return (
        <Badge variant={banned ? "destructive" : "default"} className="text-xs">
          {banned ? "Banned" : "Active"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "banReason",
    header: "Ban Reason",
    cell: ({ row }) => {
      const reason = row.getValue("banReason") as string | null;
      if (!reason)
        return <span className="text-muted-foreground text-sm">-</span>;

      return (
        <div className="max-w-[200px]">
          <span className="text-muted-foreground line-clamp-2 text-sm">
            {reason}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "banExpires",
    header: "Ban Expires",
    cell: ({ row }) => {
      const expires = row.getValue("banExpires") as string | null;
      if (!expires)
        return <span className="text-muted-foreground text-sm">-</span>;

      try {
        const date = new Date(expires);
        return (
          <span className="text-muted-foreground text-sm">
            {format(date, "MMM dd, yyyy")}
          </span>
        );
      } catch {
        return (
          <span className="text-muted-foreground text-sm">Invalid date</span>
        );
      }
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      try {
        const formattedDate = format(new Date(date), "MMM dd, yyyy");
        return (
          <span className="text-muted-foreground text-sm">{formattedDate}</span>
        );
      } catch {
        return (
          <span className="text-muted-foreground text-sm">Invalid date</span>
        );
      }
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as string;
      try {
        const formattedDate = format(new Date(date), "MMM dd, yyyy");
        return (
          <span className="text-muted-foreground text-sm">{formattedDate}</span>
        );
      } catch {
        return (
          <span className="text-muted-foreground text-sm">Invalid date</span>
        );
      }
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                console.log("Edit permissions for user:", user);
                onEditPermissions(user.id);
              }}
              className="gap-2"
            >
              <Shield className="h-4 w-4" />
              Edit Permissions
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(user.id)}
              disabled={isDeleting}
              className="gap-2 bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:text-white"
            >
              <Trash2 className="h-4 w-4 text-white" />
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
