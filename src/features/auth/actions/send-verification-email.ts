'use server'

import jwt from 'jsonwebtoken'
import { render } from '@react-email/components'
import VerifyEmail from '../components/verify-email'
import { env } from '@/env'
import { transport } from '@/lib/nodemailer'

export async function sendVerificationEmail(sendTo: string) {
    const redirectJwt = jwt.sign({ email: sendTo }, env.EMAIL_JWT_SECRET, {
        expiresIn: '24h',
    })

    try {
        const info = await transport.sendMail({
            from: env.EMAIL_SENDER_ADDRESS,
            to: sendTo,
            subject: 'Confirmação de E-mail',
            html: await render(
                VerifyEmail({
                    redirectUrl: new URL(
                        `/verify/${redirectJwt}`,
                        env.EMAIL_REDIRECT_URL
                    ).toString(),
                })
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
