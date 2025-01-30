'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addComment(
    parentId: number,
    postId: number,
    _prevState: any,
    formData: FormData
) {
    const comment = formData.get('content') as string
    const session = await auth()

    await prisma.comment.create({
        data: {
            content: comment,
            parentId,
            userId: session?.user.id as string,
            postId,
        },
    })

    revalidatePath('/posts/[id]')
    return { success: true }
}
