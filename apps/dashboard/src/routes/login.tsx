import { createFileRoute, useNavigate } from "@tanstack/react-router";

import SignInForm from "../components/sign-in-form";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <SignInForm
        onSwitchToSignUp={() => {
          navigate({
            to: "/setup-admin",
          });
        }}
      />
    </div>
  );
}
