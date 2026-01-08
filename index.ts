import app from "./app.js"
import { database } from "./prisma/database.js";
import { env } from './src/config/env.js';

async function startServer(){
  try{
    await database.connect();

    app.listen({port: env.PORT, host: '0.0.0.0'}, () => {
      console.log(`Server running on http://localhost:${env.PORT}`)
    })
  }catch (error) {
    console.log("Error starting server", { error });
    process.exit(0);
  }
}

startServer();