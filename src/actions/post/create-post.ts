'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const createPostSchema = z
    .string()
    .max(140, 'Postagem não deve conter mais de 140 caracteres.')
    .nonempty('Postagem não pode estar vazia.')

export async function createPost(_prevState: any, formData: FormData) {
    const session = await auth()
    const user = session!.user!
    const post = formData.get('post')

    const { success, data, error } = createPostSchema.safeParse(post)

    if (!success) {
        return {
            errors: error.flatten().formErrors,
        }
    }

    await prisma.post.create({
        data: {
            content: data,
            user: {
                connect: {
                    email: user.email as string,
                },
            },
        },
    })

    redirect('/')
}
