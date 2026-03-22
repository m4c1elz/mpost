'use server'

import { env } from '@/env'
import { getUserByEmail } from '@/features/users/services/get-user-by-email'
import PasswordResetEmail from '../components/password-reset-email'
import { z } from 'zod'
import { resend } from '@/lib/resend'
import { SignJWT } from 'jose'

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

    const resetPasswordJWT = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .sign(new TextEncoder().encode(env.RESET_PASSWORD_JWT_SECRET))

    const resetPasswordUrl = new URL(
        `/forgotpassword/${resetPasswordJWT}`,
        env.EMAIL_REDIRECT_URL,
    ).toString()

    try {
        await resend.emails.send({
            from: env.EMAIL_SENDER_ADDRESS,
            to: email,
            subject: 'Reinicialização de senha',
            react: PasswordResetEmail({ redirectUrl: resetPasswordUrl }),
        })

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
