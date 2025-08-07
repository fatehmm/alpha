import { db } from '@alpha/db';
import * as schema from '@alpha/db/schema/auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, openAPI, organization } from 'better-auth/plugins';
import { eq } from 'drizzle-orm';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema,
  }),
  plugins: [openAPI(), admin(), organization()],
  trustedOrigins: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.CORS_ORIGIN || '',
  ].filter(Boolean),
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const dbUsers = await db.select().from(schema.user);
          if (dbUsers.length === 1) {
            await db
              .update(schema.user)
              .set({
                role: 'admin',
              })
              .where(eq(schema.user.id, dbUsers[0].id));
          }
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, token, url }) => {
      console.table([
        ['Sending verification email to', user.email],
        ['Token:', token],
        ['URL:', url],
      ]);
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});
