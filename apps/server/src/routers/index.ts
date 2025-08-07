import { protectedProcedure, publicProcedure, router } from '../lib/trpc';
import { adminRouter } from './admin';
import { todoRouter } from './todo';
import { userRouter } from './user';

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return 'OK';
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: 'This is private',
      user: ctx.session.user,
    };
  }),
  todo: todoRouter,
  admin: adminRouter,
  user: userRouter,
});
export type AppRouter = typeof appRouter;
