import { createFileRoute } from "@tanstack/react-router";

import { Button } from "../../../components/ui/button";
import { trpc, trpcClient } from "../../../lib/trpc";
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
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-normal md:text-3xl lg:text-4xl">Users</h1>
        <Button onClick={() => setOpen()}>Create User</Button>
      </div>
      <div>
        <UserDataTable data={data} />
      </div>
    </div>
  );
}
