'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { z } from 'zod'

const editUserSchema = z.object({
    name: z.string().min(3, 'Nome deve conter no mínimo 3 caracteres.').trim(),
    atsign: z
        .string()
        .min(3, 'Apelido deve conter ao menos 3 caracteres.')
        .max(12, 'Apelido não pode conter mais de 12 caracteres.')
        .trim(),
})

export async function editUser(_prevState: any, formData: FormData) {
    const session = await auth()

    const name = formData.get('name')
    const atsign = formData.get('atsign')

    const { success, data, error } = editUserSchema.safeParse({ name, atsign })

    if (!success) {
        return {
            success,
            error: error.flatten().fieldErrors,
        }
    }

    try {
        const result = await prisma.user.update({
            where: {
                id: session?.user.id,
            },
            data,
            select: {
                name: true,
                atsign: true,
            },
        })

        return {
            success: true,
            user: result,
        }
    } catch (error) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code == 'P2002'
        ) {
            return {
                success: false,
                error: {
                    atsign: ['Já existe alguém com este apelido!'],
                    name: '',
                },
            }
        }
    }
}
