import { prisma } from '@/lib/prisma'

export async function deletePost(id: number, userId: string) {
    const deletedPost = await prisma.post.delete({
        where: {
            id,
            userId,
        },
    })

    return deletedPost
}
