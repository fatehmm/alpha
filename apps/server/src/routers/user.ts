import { auth } from '@alpha/auth';
import { db, schema } from '@alpha/db';
import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';

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
});
