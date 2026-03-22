import { env } from '@/env'
import { ReactNode } from 'react'
import { Resend } from 'resend'

const resend = new Resend(env.RESEND_API_KEY)

export async function sendMail(
    to: string | string[],
    subject: string,
    react: ReactNode,
) {
    return resend.emails.send({
        from: env.EMAIL_SENDER_ADDRESS,
        to,
        subject,
        react,
    })
}
