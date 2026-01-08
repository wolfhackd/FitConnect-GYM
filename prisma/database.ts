import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client/client.js'

export class Database {
  private static instance: Database;
  private prisma: PrismaClient;
  private isConnected = false;

  private constructor() {
    const connectionString = process.env.DATABASE_URL;

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
      return;
    }

    await this.prisma.$connect();
    this.isConnected = true;
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
