import { prisma } from '@/lib/prisma'

export async function deleteComment(id: number, userId: string) {
    const deletedComment = await prisma.comment.delete({
        where: {
            id,
            userId,
        },
    })

    return deletedComment
}
