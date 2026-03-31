'use server'

import { editUser } from '@/features/users/services/edit-user'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { hash } from 'bcrypt-ts'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { getTranslations } from 'next-intl/server'
import { _Translator } from 'next-intl'

const setNewPasswordSchema = (t: _Translator) =>
    z
        .object({
            password: z
                .string()
                .min(8, t('validation.passwordMinChars'))
                .trim(),
            confirmPassword: z
                .string()
                .min(8, t('validation.passwordMinChars'))
                .trim(),
        })
        .refine(data => data.password === data.confirmPassword, {
            message: t('validation.passwordsNotMatching'),
            path: ['confirmPassword'],
        })

export async function setNewPassword(
    userId: string,
    _prevState: unknown,
    formData: FormData,
) {
    const password = formData.get('password')
    const confirmPassword = formData.get('confirm-password')
    const t = await getTranslations('auth.passwordReset.form')

    const { data, error } = setNewPasswordSchema(t).safeParse({
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
                confirmPassword: [t('errorWhileUpdating')],
            },
        }
    }
}
