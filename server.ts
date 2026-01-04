import 'dotenv/config';
import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import { authRoutes } from './src/modules/auth.routes.js';

const app = fastify({logger: true})
const PORT = Number(process.env.PORT) || 3000

// Only for development
app.register(fastifyCors, {
  origin: '*'
})

//Routes
app.register(authRoutes, {prefix: '/auth'})


app.listen({port: PORT, host: '0.0.0.0'}, () => {
  try{
    console.log(`Server running on http://localhost:${PORT}`)
  }catch(e){
    console.log(e)
  }
})