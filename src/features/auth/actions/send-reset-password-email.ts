'use server'

import { env } from '@/env'
import { getUserByEmail } from '@/features/users/services/get-user-by-email'
import PasswordResetEmail from '../components/password-reset-email'
import { z } from 'zod'
import { sendMail } from '../lib/email'
import { signJWT } from '../lib/jwt'
import { getLocale, getTranslations } from 'next-intl/server'

const sendResetPasswordEmailSchema = z.string().email()

export async function sendResetPasswordEmail(
    _prevState: unknown,
    formData: FormData,
) {
    const sentEmail = formData.get('email')

    const { error, data: email } =
        sendResetPasswordEmailSchema.safeParse(sentEmail)

    if (error && !email) {
        return {
            success: false,
            error: 'E-mail inválido enviado.',
        }
    }

    const user = await getUserByEmail(email)

    if (!user) {
        return {
            success: false,
            error: 'Usuário não encontrado.',
        }
    }

    const payload = {
        sub: user.id,
        purpose: 'reset-password',
    }

    const resetPasswordJWT = await signJWT(
        payload,
        '24h',
        env.RESET_PASSWORD_JWT_SECRET,
    )

    const redirectUrl = new URL(
        `/forgotpassword/${resetPasswordJWT}`,
        env.EMAIL_REDIRECT_URL,
    ).toString()

    const locale = await getLocale()
    const t = await getTranslations('auth.emails.resetPassword')

    try {
        await sendMail(
            email,
            t('subject'),
            PasswordResetEmail({ redirectUrl, locale }),
        )

        return {
            success: true,
            error: null,
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: 'Não foi possível enviar o e-mail. Tente novamente mais tarde.',
        }
    }
}
