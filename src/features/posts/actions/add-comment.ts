'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addComment(
    postId: number,
    _prevState: unknown,
    formData: FormData,
    parentId?: number
) {
    const comment = formData.get('content') as string
    const session = await auth()

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

    const isPostComment = createdComment.parent === null

    const isPostFromCurrentUser =
        createdComment.post.userId === session?.user.id!

    const isParentFromCurrentUser =
        createdComment.parent?.userId === session?.user.id

    const targetUserId = isPostComment
        ? createdComment.post.userId
        : createdComment.parent?.userId!

    const baseRedirectUrl = `/posts/${createdComment.post.id}/comment/${createdComment.id}`

    // is commenting on post
    if (isPostComment && !isPostFromCurrentUser) {
        await prisma.notification.create({
            data: {
                type: 'CommentedOnPost',
                redirectTo: baseRedirectUrl,
                userId: session?.user.id!,
                targetUserId,
            },
        })
    }

    // is replying a comment
    if (!isPostComment && !isParentFromCurrentUser) {
        await prisma.notification.create({
            data: {
                type: 'RepliedComment',
                redirectTo: `${baseRedirectUrl}?showReplies=true`,
                userId: session?.user.id!,
                targetUserId,
            },
        })
    }

    revalidatePath('/posts/[id]')
    return { success: true }
}
