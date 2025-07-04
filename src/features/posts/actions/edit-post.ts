'use server'

import { auth } from '@/auth'
import { z } from 'zod'
import { updatePost } from '../services/update-post'

const editPostSchema = z
    .string()
    .trim()
    .max(140, 'Postagem não pode ter mais de 140 caracteres.')
    .nonempty('Por favor, insira a postagem no campo.')

export async function editPost(
    id: number,
    _prevState: unknown,
    formData: FormData
) {
    const session = await auth()
    const content = formData.get('content')

    const { success, data, error } = editPostSchema.safeParse(content)

    if (!success) {
        return {
            success: false,
            error: error.flatten().formErrors,
        }
    }

    await updatePost(id, data, session?.user.id!)

    return { success: true, error: '' }
}
