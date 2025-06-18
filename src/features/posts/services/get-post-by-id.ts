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
            comments: {
                select: {
                    id: true,
                    user: {
                        select: {
                            id: true,
                            atsign: true,
                            name: true,
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
                where: {
                    // only get root comments server-side
                    parentId: null,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            },
        },
    })

    return post
}
