'use server'

import { editUser } from '@/features/users/services/edit-user'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { hash } from 'bcrypt-ts'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

const setNewPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, 'Senha deve conter no mínimo 8 caracteres.')
            .trim(),
        confirmPassword: z
            .string()
            .min(8, 'Senha deve conter no mínimo 8 caracteres.')
            .trim(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Senhas não coincidem.',
        path: ['confirmPassword'],
    })

export async function setNewPassword(
    userId: string,
    _prevState: unknown,
    formData: FormData
) {
    const password = formData.get('password')
    const confirmPassword = formData.get('confirm-password')

    const { data, error } = setNewPasswordSchema.safeParse({
        password,
        confirmPassword,
    })

    if (error && !data) {
        return {
            errors: error.flatten().fieldErrors,
            success: false,
        }
    }

    try {
        await editUser(userId, { password: await hash(data.password, 10) })
        redirect('/forgotpassword/success')
    } catch (error) {
        console.log(error)

        if (isRedirectError(error)) {
            throw error
        }

        return {
            success: true,
            errors: {
                confirmPassword: ['Erro ao atualizar o usuário.'],
            },
        }
    }
}
