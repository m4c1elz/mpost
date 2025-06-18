'use server'

import { z } from 'zod'
import { getUserByEmail } from '@/features/users/services/get-user-by-email'
import { createUser } from '@/features/users/services/create-user'
import { getUserByAtsign } from '@/features/users/services/get-user-by-atsign'
import { redirect } from 'next/navigation'

const registerSchema = z.object({
    email: z.string().email('E-mail inválido.').trim(),
    password: z
        .string()
        .min(8, 'Senha deve conter no mínimo 8 caracteres.')
        .trim(),
    name: z.string().min(3, 'Nome deve conter no mínimo 3 caracteres.').trim(),
    atsign: z
        .string()
        .min(3, 'Apelido deve conter ao menos 3 caracteres.')
        .max(12, 'Apelido não pode conter mais de 12 caracteres.')
        .trim(),
})

type Response =
    | {
          success: boolean
          error: z.inferFlattenedErrors<typeof registerSchema>['fieldErrors']
      }
    | undefined

export async function register(
    _prevState: unknown,
    formData: FormData
): Promise<Response> {
    const email = formData.get('email')
    const password = formData.get('password')
    const name = formData.get('name')
    const atsign = formData.get('atsign')

    const parsed = registerSchema.safeParse({ email, password, name, atsign })

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
                email: ['E-mail inválido.'],
            },
            success: false,
        }
    }

    if (userWithAtsign) {
        return {
            error: {
                atsign: ['Apelido já em uso.'],
            },
            success: false,
        }
    }

    const { email: createdUserEmail } = await createUser(data)

    redirect(`/verify?email=${createdUserEmail}`)
}
