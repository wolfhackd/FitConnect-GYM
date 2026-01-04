import 'dotenv/config';
import fastifyCors from '@fastify/cors';
import fastify from 'fastify';

const app = fastify({logger: true})
const PORT = Number(process.env.PORT) || 3000

app.register(fastifyCors, {
  origin: '*'
})

app.listen({port: PORT, host: '0.0.0.0'}, () => {
  try{
    console.log(`Server running on http://localhost:${PORT}`)
  }catch(e){
    console.log(e)
  }
})