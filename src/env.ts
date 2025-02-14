import { z } from 'zod'

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string(),
    EMAIL_SENDER_ADDRESS: z.string().email(),
    EMAIL_SENDER_PASSWORD: z.string(),
    EMAIL_JWT_SECRET: z.string(),
    EMAIL_REDIRECT_URL: z.string().url(),
    NODE_ENV: z.enum(['production', 'development', 'test']),
    VERCEL_ENV: z.enum(['production', 'development', 'preview']).optional(),
})

export const env = envSchema.parse(process.env)
