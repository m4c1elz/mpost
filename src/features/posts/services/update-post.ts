import 'server-only'
import { prisma } from '@/lib/prisma'

export async function updatePost(id: number, content: string, userId: string) {
    const post = await prisma.post.update({
        data: {
            content,
        },
        where: {
            id,
            userId,
        },
    })

    return post
}
