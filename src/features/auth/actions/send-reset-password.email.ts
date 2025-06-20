'use server'

import { env } from '@/env'
import { getUserByEmail } from '@/features/users/services/get-user-by-email'
import { transport } from '@/lib/nodemailer'
import { render } from '@react-email/components'
import jwt, { JwtPayload } from 'jsonwebtoken'
import PasswordResetEmail from '../components/password-reset-email'
import { z } from 'zod'

const sendResetPasswordEmailSchema = z.string().email()

export async function sendResetPasswordEmail(
    _prevState: unknown,
    formData: FormData
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

    const payload: JwtPayload = {
        sub: user.id,
        purpose: 'reset-password',
    }

    const resetPasswordJWT = jwt.sign(payload, env.RESET_PASSWORD_JWT_SECRET, {
        expiresIn: '30m',
    })

    const resetPasswordUrl = new URL(
        `/resetpassword/${resetPasswordJWT}`,
        env.EMAIL_REDIRECT_URL
    ).toString()

    try {
        await transport.sendMail({
            from: env.EMAIL_SENDER_ADDRESS,
            to: [email],
            subject: 'Reinicialização de senha',
            html: await render(
                PasswordResetEmail({ redirectUrl: resetPasswordUrl })
            ),
        })

        return {
            success: true,
            error: null,
        }
    } catch (error) {
        return {
            success: false,
            error: 'Não foi possível enviar o e-mail. Tente novamente mais tarde.',
        }
    }
}
