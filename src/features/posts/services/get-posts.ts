import 'server-only'
import { prisma } from '@/lib/prisma'

export async function getPosts(page = 1, limit = 15) {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    name: true,
                    atsign: true,
                    image: true,
                },
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
