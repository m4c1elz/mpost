import { prisma } from '@/lib/prisma'

export async function getComment(commentId: number) {
    const comment = await prisma.comment.findUnique({
        where: { id: commentId },
        include: {
            post: {
                select: {
                    id: true,
                    user: true,
                    createdAt: true,
                    updatedAt: true,
                    content: true,
                },
            },
            user: {
                select: {
                    atsign: true,
                    name: true,
                },
            },
            children: {
                include: {
                    post: true,
                    children: true,
                    user: true,
                },
            },
        },
    })

    return comment
}
