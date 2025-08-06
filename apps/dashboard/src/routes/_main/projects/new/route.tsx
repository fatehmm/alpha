import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/projects/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /_main/projects/new!</div>;
}
