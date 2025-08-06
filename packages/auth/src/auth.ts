import { db } from '@alpha/db';
import * as schema from '@alpha/db/schema/auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema,
  }),
  plugins: [openAPI()],
  trustedOrigins: [
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // Server
    'http://localhost:3001', // Alternative port
    process.env.CORS_ORIGIN || '',
  ].filter(Boolean),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true,
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
