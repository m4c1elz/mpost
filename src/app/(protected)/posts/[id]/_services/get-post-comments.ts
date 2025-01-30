import { prisma } from '@/lib/prisma'

export async function getPostComments(id: number) {
    const comments = await prisma.comment.findMany({
        where: {
            Post: {
                id,
            },
        },
        select: {
            id: true,
            user: {
                select: {
                    atsign: true,
                    name: true,
                },
            },
            content: true,
            createdAt: true,
            updatedAt: true,
            parentId: true,
        },
    })

    return comments
}
