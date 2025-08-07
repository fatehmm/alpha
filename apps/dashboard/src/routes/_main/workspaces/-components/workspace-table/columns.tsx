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

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  metadata?: string | null;
  createdAt: string;
};

interface WorkspaceTableProps {
  onDelete: (workspaceId: string) => void;
  onEditPermissions: (workspaceId: string) => void;
  isDeleting: boolean;
}

export const createColumns = ({
  onDelete,
  onEditPermissions,
  isDeleting,
}: WorkspaceTableProps): ColumnDef<Workspace>[] => [
  {
    accessorKey: "name",
    header: "Workspace",
    cell: ({ row }) => {
      const workspace = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={workspace.logo || undefined}
              alt={workspace.name}
            />
            <AvatarFallback className="text-xs font-medium">
              {workspace.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{workspace.name}</span>
            <span className="text-muted-foreground text-xs">
              {workspace.slug}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => {
      const slug = row.getValue("slug") as string;
      return (
        <Badge variant="secondary" className="font-mono text-xs">
          {slug}
        </Badge>
      );
    },
  },
  {
    accessorKey: "metadata",
    header: "Metadata",
    cell: ({ row }) => {
      const metadata = row.getValue("metadata") as string | null;
      if (!metadata)
        return <span className="text-muted-foreground text-sm">-</span>;

      return (
        <div className="max-w-[200px]">
          <span className="text-muted-foreground line-clamp-2 text-sm">
            {metadata}
          </span>
        </div>
      );
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const workspace = row.original;
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
                console.log("Edit permissions for workspace:", workspace);
                onEditPermissions(workspace.id);
              }}
              className="gap-2"
            >
              <Shield className="h-4 w-4" />
              Edit Permissions
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(workspace.id)}
              disabled={isDeleting}
              className="gap-2 text-red-600 focus:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
              Delete Workspace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
