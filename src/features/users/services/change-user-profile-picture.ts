import 'server-only'
import { prisma } from '@/lib/prisma'
import { env } from '@/env'

export async function changeUserProfilePicture(
    userId: string,
    imageKey?: string
) {
    if (!imageKey) {
        await prisma.user.update({
            data: {
                image: null,
            },
            where: {
                id: userId,
            },
        })
        return
    }

    const imageUrl = env.CLOUDFLARE_BUCKET_URL.concat('/').concat(imageKey)

    await prisma.user.update({
        data: {
            image: imageUrl,
        },
        where: {
            id: userId,
        },
    })
}
