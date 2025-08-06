import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/quizes")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /_main/quizes!</div>;
}
