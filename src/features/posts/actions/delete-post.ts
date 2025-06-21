'use server'

import { auth } from '@/auth'
import { deletePost as deletePostFromDb } from '../services/delete-post'

export async function deletePost(id: number, _prevState: unknown) {
    const session = await auth()

    await deletePostFromDb(id, session?.user.id!)

    return { success: true, error: '' }
}
