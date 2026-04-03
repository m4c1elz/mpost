'use server'

import { auth } from '@/auth'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { z } from 'zod'
import { editUser as editUserFromDb } from '../services/edit-user'
import { _Translator } from 'next-intl'
import { getTranslations } from 'next-intl/server'

const editUserSchema = (t: _Translator) =>
    z.object({
        name: z.string().min(3, t('nameMinChars')).trim(),
        atsign: z
            .string()
            .min(3, t('usernameMinChars'))
            .max(12, t('usernameMaxChars'))
            .trim(),
        status: z.string().max(50, t('statusMinChars')).trim().optional(),
        url: z
            .string()
            .url(t('invalidUrl'))
            .trim()
            .optional()
            .or(z.literal('')),
    })

export async function editUser(_prevState: unknown, formData: FormData) {
    const session = await auth()

    const name = formData.get('name')
    const atsign = formData.get('atsign')
    const status = formData.get('status')
    const url = formData.get('url')

    const t = await getTranslations(
        'settings.options.user.info.form.validation',
    )

    const { success, data, error } = editUserSchema(t).safeParse({
        name,
        atsign,
        status,
        url,
    })

    if (!success) {
        return {
            success,
            error: error.flatten().fieldErrors,
        }
    }

    try {
        const result = await editUserFromDb(session?.user.id!, data)

        return {
            success: true,
            user: result,
        }
    } catch (error) {
        console.log(error)
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code == 'P2002'
        ) {
            return {
                success: false,
                error: {
                    atsign: [t('usernameInUse')],
                    name: '',
                    status: '',
                    url: '',
                },
            }
        }
    }
}
