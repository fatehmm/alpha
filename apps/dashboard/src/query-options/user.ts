import { authClient } from "@/lib/auth-client";
import { queryOptions } from "@tanstack/react-query";

// export const getUserQueryOptions = queryOptions({
//   queryKey: ["get-user-info"],
//   queryFn: accountService.getUserInfo,
//   // enabled: !user && cookies.isLoggedIn,
// });

export const getSessionQueryOptions = queryOptions({
  queryKey: ["get-session-info"],
  queryFn: async () => {
    const session = await authClient.getSession();
    if (!session.data) {
      throw new Error("No session found");
    }
    
    // Transform better-auth session data to match ISession interface
    return {
      session: {
        id: session.data.session.id,
        expiresAt: session.data.session.expiresAt,
        token: session.data.session.token,
        createdAt: session.data.session.createdAt,
        updatedAt: session.data.session.updatedAt,
        ipAddress: session.data.session.ipAddress || '',
        userAgent: session.data.session.userAgent || '',
        userId: session.data.session.userId,
      },
      user: {
        id: session.data.user.id,
        name: session.data.user.name,
        email: session.data.user.email,
        emailVerified: session.data.user.emailVerified,
        image: session.data.user.image,
        createdAt: session.data.user.createdAt,
        updatedAt: session.data.user.updatedAt,
      },
    };
  },
});
