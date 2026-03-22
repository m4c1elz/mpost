'use server'

import VerifyEmail from '../components/verify-email'
import { env } from '@/env'
import { SignJWT } from 'jose'
import { resend } from '@/lib/resend'

export async function sendVerificationEmail(sendTo: string) {
    const redirectJwt = await new SignJWT({ email: sendTo })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .sign(new TextEncoder().encode(env.EMAIL_JWT_SECRET))

    try {
        const info = await resend.emails.send({
            from: env.EMAIL_SENDER_ADDRESS,
            to: sendTo,
            subject: 'Verificação de E-mail',
            react: VerifyEmail({
                redirectUrl: new URL(
                    `/verify/${redirectJwt}?email=${sendTo}`,
                    env.EMAIL_REDIRECT_URL,
                ).toString(),
            }),
        })

        console.log(info)
    } catch (error) {
        console.log(error)
        return {
            error: { email: ['Erro crítico ao enviar email de confirmação.'] },
            success: false,
        }
    }

    return { success: true, error: {}, email: sendTo }
}
