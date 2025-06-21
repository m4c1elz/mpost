import 'server-only'
import { prisma } from '@/lib/prisma'

export async function getUserPostsByAtsign(
    atsign: string,
    page = 1,
    limit = 15
) {
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    atsign: true,
                    name: true,
                    image: true,
                },
            },
        },
        where: {
            user: {
                atsign,
            },
        },
        take: limit,
        skip: (page - 1) * limit,
    })

    const {
        _count: { id: postCount },
    } = await prisma.post.aggregate({
        _count: {
            id: true,
        },
        where: {
            user: { atsign },
        },
    })

    const totalPages = Math.ceil(postCount / limit)

    return {
        data: posts,
        pagination: {
            page,
            limit,
            totalPages,
            totalItems: postCount,
        },
    }
}
