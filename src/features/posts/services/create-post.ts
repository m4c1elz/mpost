import 'server-only'
import { prisma } from '@/lib/prisma'

export async function createPost(content: string, userEmail: string) {
    const post = await prisma.post.create({
        data: {
            content,
            user: {
                connect: {
                    email: userEmail,
                },
            },
        },
    })

    return post
}
