'use server'

import { render } from '@react-email/components'
import VerifyEmail from '../components/verify-email'
import { env } from '@/env'
import { transport } from '@/lib/nodemailer'
import { SignJWT } from 'jose'

export async function sendVerificationEmail(sendTo: string) {
    const redirectJwt = await new SignJWT({ email: sendTo })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .sign(new TextEncoder().encode(env.EMAIL_JWT_SECRET))

    try {
        const info = await transport.sendMail({
            from: env.EMAIL_SENDER_ADDRESS,
            to: sendTo,
            subject: 'Confirmação de E-mail',
            html: await render(
                VerifyEmail({
                    redirectUrl: new URL(
                        `/verify/${redirectJwt}?email=${sendTo}`,
                        env.EMAIL_REDIRECT_URL,
                    ).toString(),
                }),
            ),
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
