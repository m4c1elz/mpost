import { env } from '@/env'
import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.EMAIL_SENDER_ADDRESS,
        pass: env.EMAIL_SENDER_PASSWORD,
    },
})
