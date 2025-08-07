import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './context';

export const t = initTRPC.context<Context>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Authentication required',
      cause: 'No session',
    });
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});

export const adminProcedure = t.procedure.use(({ ctx, next }) => {
  if (ctx.session?.user.role?.toUpperCase() !== 'ADMIN') {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You are not authorized to access this resource',
    });
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});
