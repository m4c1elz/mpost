import { prisma } from '@/lib/prisma'
import 'server-only'

export function getPinnedPost(userId: string) {
    return prisma.post.findFirst({
        where: {
            isPinned: true,
            userId,
        },
    })
}
