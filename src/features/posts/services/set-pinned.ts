import { prisma } from '@/lib/prisma'
import 'server-only'

export async function setPinnedPost(id: number, userId: string, pin: boolean) {
    return prisma.post.update({
        where: { id, userId },
        data: {
            isPinned: pin,
        },
    })
}
