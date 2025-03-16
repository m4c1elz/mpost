'use server'

import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt-ts'
import { z } from 'zod'
import { sendVerificationEmail } from '../email/send-verification-email'

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
          email?: string
          id?: string
      }
    | undefined

export async function register(
    _prevState: any,
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

    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    })

    if (user) {
        const atsignExists = user.atsign == atsign

        return {
            error: {
                email: ['E-mail inválido.'],
                ...(atsignExists && {
                    atsign: ['Apelido inválido.'],
                }),
            },
            success: false,
        }
    }

    const newUser = await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            atsign: data.atsign,
            password: await hash(data.password, 10),
        },
    })

    return sendVerificationEmail(newUser.id, newUser.email)
}
