import { db, schema } from '@alpha/db';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { adminProcedure, protectedProcedure, router } from '../lib/trpc';

const createOrganizationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  logo: z.string().optional(),
  metadata: z.string().optional(),
});

export const organizationRouter = router({
  getOrganizations: protectedProcedure.query(async () => {
    console.log('Fetching organizations...');
    const organizations = await db.select().from(schema.organization.organization);
    console.log('Organizations found:', organizations);
    return organizations;
  }),

  listAllOrganizations: adminProcedure.query(async () => {
    const organizations = await db.select().from(schema.organization.organization);
    return organizations;
  }),

  createOrganization: protectedProcedure.input(createOrganizationSchema).mutation(async ({ input }) => {
    const [organization] = await db
      .insert(schema.organization.organization)
      .values({
        id: crypto.randomUUID(),
        name: input.name,
        slug: input.slug,
        logo: input.logo || null,
        metadata: input.metadata || null,
      })
      .returning();

    return organization;
  }),

  deleteOrganization: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    await db.delete(schema.organization.organization).where(eq(schema.organization.organization.id, input.id));
    return { success: true };
  }),
});
