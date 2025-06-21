import 'server-only'
import { prisma } from '@/lib/prisma'

export async function createComment(
    content: string,
    postId: number,
    userId: string,
    parentId?: number
) {
    const createdComment = await prisma.comment.create({
        data: {
            content,
            userId,
            postId,
            parentId,
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

    return createdComment
}
