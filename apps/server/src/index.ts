import { auth } from '@alpha/auth';
import { trpcServer } from '@hono/trpc-server';
import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { createContext } from './lib/context';
import { appRouter } from './routers/index';

const app = new Hono();

app.use(logger());

// CORS configuration for all routes
app.use(
  '/*',
  cors({
    origin: (origin) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return '*';

      const allowedOrigins = [
        'http://localhost:5173', // Vite dev server
        'http://localhost:3000', // Server
        'http://localhost:3001', // Alternative port
        process.env.CORS_ORIGIN || '',
      ].filter(Boolean);

      return allowedOrigins.includes(origin) ? origin : null;
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'x-timezone'],
    credentials: true,
    maxAge: 86400, // 24 hours
  })
);

// Auth routes with CORS headers
app.on(['POST', 'GET', 'OPTIONS'], '/api/auth/**', async (c) => {
  // Handle preflight requests
  if (c.req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': c.req.header('Origin') || '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, Origin, x-timezone',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  return auth.handler(c.req.raw);
});

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    createContext: (_opts, context) => {
      return createContext({ context });
    },
  })
);

app.get('/', (c) => {
  return c.text('OK');
});

export default app;
