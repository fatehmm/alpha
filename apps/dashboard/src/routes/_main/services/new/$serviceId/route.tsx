import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/services/new/$serviceId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /_main/services/new/$serviceId!</div>;
}
