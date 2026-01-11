
import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
// import { authRoutes } from './src/modules/auth.routes.js';
import fastifyCookie from '@fastify/cookie';
import { env } from './src/config/env.js';
import { authRoutes } from './src/modules/auth/auth.routes.js';

const app = fastify({logger: true})

// Only for development
app.register(fastifyCors, {
  origin: '*',
  credentials: true
})

// Cookie plugin
app.register(fastifyCookie, {
  secret: env.COOKIE_SECRET!
});


//Routes
app.register(authRoutes, {prefix: '/auth'})

export default app;