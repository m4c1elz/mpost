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
    const t = await getTranslations('auth.emails.resetPassword')
    const sentEmail = formData.get('email')

    const { error, data: email } =
        sendResetPasswordEmailSchema.safeParse(sentEmail)

    if (error && !email) {
        return {
            success: false,
            error: t('invalidEmail'),
        }
    }

    const user = await getUserByEmail(email)

    if (!user) {
        return {
            success: false,
            error: t('userNotFound'),
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
            error: t('couldntSendEmail'),
        }
    }
}
