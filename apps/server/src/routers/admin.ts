import { db, schema } from '@alpha/db';
import { eq } from 'drizzle-orm';
import { publicProcedure, router } from '../lib/trpc';

export const adminRouter = router({
  checkIfExists: publicProcedure.query(async () => {
    const user = await db.select().from(schema.auth.user).where(eq(schema.auth.user.role, 'admin'));
    return user.length > 0;
  }),
});
