import { db } from '@alpha/db';
import { todo } from '@alpha/db/schema/todo';
import { redis } from '@alpha/redis';
import { eq } from 'drizzle-orm';
import z from 'zod';
import { publicProcedure, router } from '../lib/trpc';

export const todoRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(todo);
  }),

  create: publicProcedure.input(z.object({ text: z.string().min(1) })).mutation(async ({ input }) => {
    return await redis.set('todo', input.text);
  }),

  toggle: publicProcedure.input(z.object({ id: z.number(), completed: z.boolean() })).mutation(async ({ input }) => {
    return await db.update(todo).set({ completed: input.completed }).where(eq(todo.id, input.id));
  }),

  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    return await db.delete(todo).where(eq(todo.id, input.id));
  }),
});
