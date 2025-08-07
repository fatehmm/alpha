import { adminClient, organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: import.meta.env.PUBLIC_API_URL,
  plugins: [organizationClient(), adminClient()],
});

export const { useSession } = authClient;
