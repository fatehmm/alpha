import {
  createFileRoute,
  useLoaderData,
  useNavigate,
} from "@tanstack/react-router";

import SignUpForm from "../components/sign-up-form";
import { trpcClient } from "../lib/trpc";

export const Route = createFileRoute("/setup-admin")({
  component: RouteComponent,
  loader: async () => {
    const adminExists = await trpcClient.admin.checkIfExists.query();
    console.log(adminExists ? "Admin exists" : "Admin does not exist");
    return {
      adminExists: adminExists || false,
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { adminExists } = useLoaderData({ from: "/setup-admin" });
  if (adminExists) {
    navigate({
      to: "/login",
    });
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <SignUpForm
        onSwitchToSignIn={() => {
          navigate({
            to: "/login",
          });
        }}
      />
    </div>
  );
}
