'use server'

import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createPost as createPostFromDb } from '../services/create-post'

const createPostSchema = z
    .string()
    .max(140, 'Postagem não deve conter mais de 140 caracteres.')
    .nonempty('Postagem não pode estar vazia.')
    .trim()

export async function createPost(_prevState: unknown, formData: FormData) {
    const session = await auth()
    const user = session!.user!
    const post = formData.get('post')

    const { success, data, error } = createPostSchema.safeParse(post)

    if (!success) {
        return {
            errors: error.flatten().formErrors,
        }
    }

    await createPostFromDb(data, user.email!)

    redirect('/')
}
