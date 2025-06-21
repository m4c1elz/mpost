import 'server-only'
import { prisma } from '@/lib/prisma'

export async function getPostById(id: number) {
    const post = await prisma.post.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    image: true,
                    name: true,
                    atsign: true,
                },
            },
        },
    })

    return post
}
