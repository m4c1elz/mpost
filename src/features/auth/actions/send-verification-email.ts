'use server'

import VerifyEmail from '../components/verify-email'
import { env } from '@/env'
import { signJWT } from '../lib/jwt'
import { sendMail } from '../lib/email'

export async function sendVerificationEmail(email: string) {
    const redirectJwt = await signJWT({ email }, '24h', env.EMAIL_JWT_SECRET)

    const redirectUrl = env.EMAIL_REDIRECT_URL.concat(
        `/verify/${redirectJwt}?email=${email}`,
    )

    try {
        const info = sendMail(
            email,
            'Verificação de E-mail',
            VerifyEmail({ redirectUrl }),
        )

        console.log(info)
    } catch (error) {
        console.log(error)
        return {
            error: { email: ['Erro crítico ao enviar email de confirmação.'] },
            success: false,
        }
    }

    return { success: true, error: {}, email }
}
