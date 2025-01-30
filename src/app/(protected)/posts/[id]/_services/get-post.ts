import { prisma } from '@/lib/prisma'
import 'server-only'

const commentPropsToSelect = {}

export async function getPost(id: number) {
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
                            atsign: true,
                            name: true,
                        },
                    },
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    parentId: true,
                },
            },
        },
    })

    return post
}
