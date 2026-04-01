'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { _Translator } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { redirect } from '@/i18n/navigation'
import { z } from 'zod'

const loginSchema = (t: _Translator) =>
    z.object({
        email: z.string().email(t('invalidEmail')).trim(),
        password: z.string().min(8, t('passwordMinChars')).trim(),
    })

type ErrorResponse = z.inferFlattenedErrors<
    ReturnType<typeof loginSchema>
>['fieldErrors']

type LoginResponse = {
    errors: ErrorResponse
    success?: boolean
}

export async function login(
    _prevState: unknown,
    formData: FormData,
): Promise<LoginResponse | undefined> {
    const email = formData.get('email')
    const password = formData.get('password')

    const t = await getTranslations('auth.login.form')
    const locale = await getLocale()

    const { success, data, error } = loginSchema(t).safeParse({
        email,
        password,
    })

    if (!success) {
        return {
            errors: error.flatten().fieldErrors,
        }
    }

    try {
        await signIn('credentials', { ...data, redirectTo: '/' })
    } catch (error) {
        if (isRedirectError(error)) {
            throw error
        }

        if (error instanceof AuthError) {
            if (error.cause?.err?.message === 'EMAIL_NOT_VERIFIED') {
                redirect({ href: `/verify?email=${data.email}`, locale })
            }

            if ((error.type = 'CredentialsSignin')) {
                return {
                    errors: {
                        password: ['Credenciais inválidas.'],
                    },
                }
            }
        }

        if (error instanceof Error) {
            return {
                errors: { password: [error.message] },
            }
        }
    }
}
