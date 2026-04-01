'use server'

import { z } from 'zod'
import { getUserByEmail } from '@/features/users/services/get-user-by-email'
import { createUser } from '@/features/users/services/create-user'
import { getUserByAtsign } from '@/features/users/services/get-user-by-atsign'
import { redirect } from '@/i18n/navigation'
import { _Translator } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'

const registerSchema = (t: _Translator) =>
    z
        .object({
            email: z.string().email(t('invalidEmail')).trim(),
            password: z.string().min(8, t('passwordMinChars')).trim(),
            name: z.string().min(3, t('nameMinChars')).trim(),
            atsign: z
                .string()
                .min(3, t('usernameMinChars'))
                .max(12, t('usernameMaxChars'))
                .trim(),
            confirmPassword: z.string().min(8, t('passwordMinChars')).trim(),
        })
        .refine(data => data.password === data.confirmPassword, {
            message: t('passwordsNotMatching'),
            path: ['confirmPassword'],
        })

type Response =
    | {
          success: boolean
          error: z.inferFlattenedErrors<
              ReturnType<typeof registerSchema>
          >['fieldErrors']
      }
    | undefined

export async function register(
    _prevState: unknown,
    formData: FormData,
): Promise<Response> {
    const email = formData.get('email')
    const password = formData.get('password')
    const name = formData.get('name')
    const atsign = formData.get('atsign')
    const confirmPassword = formData.get('confirm-password')

    const t = await getTranslations('auth.register.form')

    const parsed = registerSchema(t).safeParse({
        email,
        password,
        name,
        atsign,
        confirmPassword,
    })

    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.flatten().fieldErrors,
        }
    }

    const data = parsed.data

    const [userWithEmail, userWithAtsign] = await Promise.all([
        getUserByEmail(data.email),
        getUserByAtsign(data.atsign),
    ])

    if (userWithEmail) {
        return {
            error: {
                email: [t('invalidEmail')],
            },
            success: false,
        }
    }

    if (userWithAtsign) {
        return {
            error: {
                atsign: [t('usernameInUse')],
            },
            success: false,
        }
    }

    const { email: createdUserEmail } = await createUser(data)

    const locale = await getLocale()

    redirect({ href: `/verify?email=${createdUserEmail}`, locale })
}
