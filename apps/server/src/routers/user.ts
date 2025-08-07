import { auth } from '@alpha/auth';
import { db, schema } from '@alpha/db';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { adminProcedure, publicProcedure, router } from '../lib/trpc';

const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const userRouter = router({
  getUsers: publicProcedure.query(async () => {
    // We will further change this query
    const users = await db.select().from(schema.auth.user);
    return users;
  }),

  createUser: publicProcedure.input(createUserSchema).mutation(async ({ input }) => {
    const response = await auth.api.createUser({
      body: {
        email: input.email,
        password: input.password,
        name: input.name,
      },
    });

    return response.user;
  }),

  deleteUser: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    await db.delete(schema.auth.user).where(eq(schema.auth.user.id, input.id));
    return { success: true };
  }),
});
