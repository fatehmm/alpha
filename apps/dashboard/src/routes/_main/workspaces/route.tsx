import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "../../../components/ui/button";
import { trpc } from "../../../lib/trpc";
import { useActionConfirmStore } from "../../../store/action-confirm";
import { useWorkspaceCreateStore } from "../../../store/workspace";
import { WorkspaceDataTable } from "./-components/workspace-table/data-table";

export const Route = createFileRoute("/_main/workspaces")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } =
    trpc.organization.getOrganizations.useQuery();
  const { setOpen } = useWorkspaceCreateStore();
  const { setOpen: setActionConfirmOpen } = useActionConfirmStore();
  const utils = trpc.useUtils();

  const deleteOrganizationMutation =
    trpc.organization.deleteOrganization.useMutation({
      onSuccess: () => {
        toast.success("Workspace deleted successfully");
        utils.organization.getOrganizations.invalidate();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete workspace");
      },
    });

  const handleDeleteWorkspace = (workspaceId: string) => {
    setActionConfirmOpen({
      title: "Delete Workspace",
      content:
        "Are you sure you want to delete this workspace? This action cannot be undone.",
      confirmText: "Delete Workspace",
      onConfirm: () => deleteOrganizationMutation.mutate({ id: workspaceId }),
    });
  };

  const handleEditPermissions = (workspaceId: string) => {
    // This will be implemented later
    console.log("Edit permissions for workspace ID:", workspaceId);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-normal md:text-3xl lg:text-4xl">
            Workspaces
          </h1>
          <Button onClick={() => setOpen()}>Create Workspace</Button>
        </div>
        <div className="flex items-center justify-center p-8">
          <span className="text-muted-foreground">Loading workspaces...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-normal md:text-3xl lg:text-4xl">
            Workspaces
          </h1>

          <Button onClick={() => setOpen()}>Create Workspace</Button>
        </div>
        <div className="flex items-center justify-center p-8">
          <span className="text-red-500">
            Error loading workspaces: {error.message}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-normal md:text-3xl lg:text-4xl">
          Workspaces
        </h1>
        <Button onClick={() => setOpen()}>Create Workspace</Button>
      </div>
      <div>
        <WorkspaceDataTable
          data={data || []}
          onDelete={handleDeleteWorkspace}
          onEditPermissions={handleEditPermissions}
          isDeleting={deleteOrganizationMutation.isPending}
        />
      </div>
    </div>
  );
}
