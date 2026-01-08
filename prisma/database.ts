import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client/client.js'
import { env } from '../src/config/env.js';

export class Database {
  private static instance: Database;
  private prisma: PrismaClient;
  private isConnected = false;

  private constructor() {
    const connectionString = env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("DATABASE_URL not defined");
    }

    const adapter = new PrismaPg({ connectionString });
    this.prisma = new PrismaClient({ adapter });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public getClient(): PrismaClient {
    return this.prisma;
  }

  // 🔌 Conecta explicitamente (útil em bootstrap e testes)
  public async connect(): Promise<void> {
    if (this.isConnected) {
      console.log("Database is already connected");
      return;
    }

    try{
      console.log("Connecting to the database...");
      await this.prisma.$connect();
      this.isConnected = true;
      console.log("Database connected successfully");
    }catch(e){
      console.log(e)
    }
  }

  // 🔌 Fecha conexões (shutdown / testes)
  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    await this.prisma.$disconnect();
    this.isConnected = false;
  }

  // 🩺 Health check simples
  public getConnectionStatus(): boolean {
    return this.isConnected;
  }

  // ♻️ Útil em testes
  public async clearInstance(): Promise<void> {
    if (this.isConnected) {
      await this.disconnect();
    }

    Database.instance = undefined as unknown as Database;
  }
}

export const database = Database.getInstance();
export const prisma = database.getClient();