'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addComment(
    postId: number,
    _prevState: any,
    formData: FormData,
    parentId?: number
) {
    const comment = formData.get('content') as string
    const session = await auth()

    // if there's a parentId, then we're replying a comment
    const isReplyingComment = typeof parentId == 'number'

    const createdComment = await prisma.comment.create({
        data: {
            content: comment,
            parentId,
            userId: session?.user.id as string,
            postId,
        },
        select: {
            id: true,
            post: {
                select: {
                    id: true,
                    userId: true,
                },
            },
            parent: {
                select: {
                    userId: true,
                },
            },
        },
    })

    // create notification only if the user isn't replying himself
    if (
        createdComment.post.userId !== session?.user.id! &&
        createdComment.parent?.userId !== session?.user.id
    ) {
        await prisma.notification.create({
            data: {
                type: isReplyingComment ? 'RepliedComment' : 'CommentedOnPost',
                userId: session?.user.id!,
                targetUserId: isReplyingComment
                    ? createdComment.parent?.userId!
                    : createdComment.post.userId,
                redirectTo: `/posts/${createdComment.post.id}/comment/${createdComment.id}`,
            },
        })
    }

    revalidatePath('/posts/[id]')
    return { success: true }
}
