import dotenv from 'dotenv'
import z from 'zod'

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  COOKIE_SECRET: z.string().min(1, 'COOKIE_SECRET is required'),
  PASSWORD_SALT: z.number().default(10),
  PASSWORD_SECRET: z.string().min(10, 'PASSWORD_SECRET must be at least 10 characters long'),
  JWT_EXPIRES_IN_MINUTES: z.number().default(60),
  JWT_ALGORITHM: z.string().default('HS256'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data