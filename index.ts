import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import { authRoutes } from './src/modules/auth.routes.js';
import jwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { env } from './src/config/env.js';


const app = fastify({logger: true})
const PORT = Number(env.PORT) || 3000

// Only for development
app.register(fastifyCors, {
  origin: '*',
  credentials: true
})

//Configuration
app.register(fastifyCookie,
  {
    secret: env.COOKIE_SECRET!,
  }
)

app.register(jwt,{
  secret: env.JWT_SECRET!,
  cookie: {
    cookieName: 'token',
    signed: true,
  },
})

//Routes
app.register(authRoutes, {prefix: '/auth'})

app.listen({port: PORT, host: '0.0.0.0'}, () => {
  try{
    console.log('NODE_ENV:', env.NODE_ENV)
console.log('DATABASE_URL:', env.DATABASE_URL)
    console.log(`Server running on http://localhost:${PORT}`)
  }catch(e){
    console.log(e)
  }
})