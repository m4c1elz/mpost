'use server'

import VerifyEmail from '../components/verify-email'
import { env } from '@/env'
import { signJWT } from '../lib/jwt'
import { sendMail } from '../lib/email'
import { getLocale, getTranslations } from 'next-intl/server'

export async function sendVerificationEmail(email: string) {
    const redirectJwt = await signJWT({ email }, '24h', env.EMAIL_JWT_SECRET)

    const redirectUrl = env.EMAIL_REDIRECT_URL.concat(
        `/verify/${redirectJwt}?email=${email}`,
    )

    const locale = await getLocale()
    const t = await getTranslations('auth.emails.verifyAccount')

    try {
        const info = await sendMail(
            email,
            t('subject'),
            VerifyEmail({ redirectUrl, locale }),
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
