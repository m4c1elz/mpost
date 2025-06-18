'use server'

import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { createComment } from '../services/create-comment'
import { createNotification } from '@/features/notifications/services/create-notification'

export async function addComment(
    postId: number,
    _prevState: unknown,
    formData: FormData,
    parentId?: number
) {
    const content = formData.get('content') as string
    const session = await auth()

    const createdComment = await createComment(
        content,
        postId,
        session?.user.id!,
        parentId
    )

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
        await createNotification(session?.user.id!, targetUserId, {
            type: 'CommentedOnPost',
            redirectTo: baseRedirectUrl,
        })
    }

    // is replying a comment
    if (!isPostComment && !isParentFromCurrentUser) {
        await createNotification(session?.user.id!, targetUserId, {
            type: 'RepliedComment',
            redirectTo: `${baseRedirectUrl}?showReplies=true`,
        })
    }

    revalidatePath('/posts/[id]')
    return { success: true }
}
