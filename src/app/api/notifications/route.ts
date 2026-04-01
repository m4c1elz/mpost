import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { $Enums } from '@prisma/client'
import { getTranslations } from 'next-intl/server'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    const session = await auth()
    const t = await getTranslations('notifications')

    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }

    const queryPage = req.nextUrl.searchParams.get('page')

    const page = Number(queryPage ?? 1)
    const limit = 15

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
        take: limit,
        skip: (page - 1) * limit,
    })

    const notificationCount = await prisma.notification.count({
        where: { targetUserId: session.user.id },
    })

    const totalPages = Math.ceil(notificationCount / limit)

    const notificationsList = notifications.map(item => {
        // FIXME: this api route is not localized. format on client-side.
        const messages: Record<$Enums.NotificationType, string> = {
            CommentedOnPost: t('commentedOnPost'),
            RepliedComment: t('repliedComment'),
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

    return Response.json({
        data: notificationsList,
        pagination: {
            page,
            limit,
            totalPages,
            totalItems: notificationCount,
        },
    })
}
