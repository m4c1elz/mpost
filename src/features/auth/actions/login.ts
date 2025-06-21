'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const loginSchema = z.object({
    email: z.string().email('E-mail inválido.').trim(),
    password: z
        .string()
        .min(8, 'Senha deve conter no mínimo 8 caracteres.')
        .trim(),
})

type ErrorResponse = z.inferFlattenedErrors<typeof loginSchema>['fieldErrors']

type LoginResponse = {
    errors: ErrorResponse
    success?: boolean
}

export async function login(
    _prevState: unknown,
    formData: FormData
): Promise<LoginResponse | undefined> {
    const email = formData.get('email')
    const password = formData.get('password')

    const { success, data, error } = loginSchema.safeParse({ email, password })

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
                redirect(`/verify?email=${data.email}`)
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
