import { prisma } from '@/lib/prisma'
import 'server-only'

export async function setPinnedPost(id: number, pin: boolean) {
    return prisma.post.update({
        where: { id },
        data: {
            isPinned: pin,
        },
    })
}
