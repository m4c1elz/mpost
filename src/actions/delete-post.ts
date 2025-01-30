'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function deletePost(id: number, _prevState: any) {
    const session = await auth()

    await prisma.post.delete({
        where: {
            id,
            userId: session?.user.id,
        },
    })

    return { success: true, error: '' }
}
