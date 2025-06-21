import { prisma } from '@/lib/prisma'
import { NotificationType } from '@prisma/client'

type CreateNotificationOptions = {
    type: NotificationType
    redirectTo: string
}

export async function createNotification(
    userId: string,
    targetUserId: string,
    opts: CreateNotificationOptions
) {
    await prisma.notification.create({
        data: {
            userId,
            targetUserId,
            ...opts,
        },
    })
}
