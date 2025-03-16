import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { $Enums } from '@prisma/client'

export async function GET() {
    const session = await auth()

    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }

    const notifications = await prisma.notification.findMany({
        where: {
            targetUserId: session.user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            user: {
                select: {
                    atsign: true,
                },
            },
            isRead: true,
            createdAt: true,
            type: true,
            redirectTo: true,
        },
    })

    const notificationsList = notifications.map(item => {
        const messages: Record<$Enums.NotificationType, string> = {
            CommentedOnPost: 'comentou na sua postagem',
            RepliedComment: 'respondeu ao seu comentário',
        }

        return {
            id: item.id,
            user: item.user.atsign,
            message: messages[item.type],
            href: item.redirectTo,
            createdAt: item.createdAt,
            isRead: item.isRead,
        }
    })

    return Response.json(notificationsList)
}
