import { createFileRoute } from "@tanstack/react-router";

import { Button } from "../../../components/ui/button";

export const Route = createFileRoute("/_main/workspaces")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-normal md:text-3xl lg:text-4xl">Users</h1>
        <Button onClick={() => setOpen()}>Create User</Button>
      </div>
      <div>hello</div>
    </div>
  );
}
