'use server'

import { auth } from '@/auth'
import { deleteComment as deleteCommentFromDb } from '../services/delete-comment'

export async function deleteComment(id: number) {
    const session = await auth()

    await deleteCommentFromDb(id, session?.user.id!)

    return { success: true, error: '' }
}
