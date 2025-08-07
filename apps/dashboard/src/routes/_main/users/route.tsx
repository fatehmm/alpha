import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "../../../components/ui/button";
import { trpc, trpcClient } from "../../../lib/trpc";
import { useActionConfirmStore } from "../../../store/action-confirm";
import { useUserCreateStore } from "../../../store/user";
import { UserDataTable } from "./-components/user-table/data-table";

export const Route = createFileRoute("/_main/users")({
  component: RouteComponent,
  loader: async () => {
    const users = await trpcClient.user.getUsers.query();
    return {
      users,
    };
  },
});

function RouteComponent() {
  const [data] = trpc.user.getUsers.useSuspenseQuery();
  const { setOpen } = useUserCreateStore();
  const { setOpen: setActionConfirmOpen } = useActionConfirmStore();
  const utils = trpc.useUtils();

  const deleteUserMutation = trpc.user.deleteUser.useMutation({
    onSuccess: () => {
      toast.success("User deleted successfully");
      utils.user.getUsers.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete user");
    },
  });

  const handleDeleteUser = (userId: string) => {
    setActionConfirmOpen({
      title: "Delete User",
      content: "Are you sure you want to delete this user? This action cannot be undone.",
      confirmText: "Delete User",
      onConfirm: () => deleteUserMutation.mutate({ id: userId }),
    });
  };

  const handleEditPermissions = (userId: string) => {
    // This will be implemented later
    console.log("Edit permissions for user ID:", userId);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-normal md:text-3xl lg:text-4xl">Users</h1>
        <Button onClick={() => setOpen()}>Create User</Button>
      </div>
      <div>
        <UserDataTable
          data={data}
          onDelete={handleDeleteUser}
          onEditPermissions={handleEditPermissions}
          isDeleting={deleteUserMutation.isPending}
        />
      </div>
    </div>
  );
}
