import 'server-only'
import { prisma } from '@/lib/prisma'

export async function getPostComments(postId: number, page = 1, limit = 10) {
    const comments = await prisma.comment.findMany({
        where: { postId, parentId: null },
        select: {
            id: true,
            user: {
                select: {
                    id: true,
                    atsign: true,
                    name: true,
                    image: true,
                },
            },
            content: true,
            createdAt: true,
            updatedAt: true,
            parentId: true,
            children: {
                // only to verify if there's any children
                select: {
                    id: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: limit,
        skip: (page - 1) * limit,
    })

    const totalItems = await prisma.comment.count({
        where: { postId, parentId: null },
    })

    const totalPages = Math.ceil(totalItems / limit)

    return {
        data: comments,
        pagination: {
            page,
            limit,
            totalItems,
            totalPages,
        },
    }
}
