import 'server-only'
import { prisma } from '@/lib/prisma'

export async function getPosts() {
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
                },
            },
        },
    })

    return posts
}
