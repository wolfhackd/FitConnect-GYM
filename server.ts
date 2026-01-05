import 'dotenv/config';
import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import { authRoutes } from './src/modules/auth.routes.js';
import jwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';

const app = fastify({logger: true})
const PORT = Number(process.env.PORT) || 3000

// Only for development
app.register(fastifyCors, {
  origin: '*',
  credentials: true
})

//Configuration
app.register(jwt,{
  secret: process.env.JWT_SECRET!,
  cookie: {
    cookieName: 'token',
    signed: false,
  },
})
app.register(fastifyCookie)

//Routes
app.register(authRoutes, {prefix: '/auth'})

app.listen({port: PORT, host: '0.0.0.0'}, () => {
  try{
    console.log(`Server running on http://localhost:${PORT}`)
  }catch(e){
    console.log(e)
  }
})