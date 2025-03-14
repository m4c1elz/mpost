import { Bell } from 'lucide-react'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import { useEffect, useState } from 'react'
import { TZDate } from '@date-fns/tz'
import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useRouter } from 'next-nprogress-bar'

type NotificationList = {
    id: string
    user: string
    message: string
    href: string
    createdAt: string
    isRead: boolean
}[]

async function getNotifications() {
    const response = await fetch('/api/notifications', {
        next: {
            tags: ['notifications'],
        },
        cache: 'no-cache',
    })
    if (!response.ok) {
        throw new Error('Error finding notifications')
    }

    const result: NotificationList = await response.json()
    return result
}

async function markNotificationAsRead(id: string) {
    await fetch(`/api/notifications/${id}/read`, {
        method: 'PATCH',
    })
}

export function NotificationsButton() {
    const [notifications, setNotifications] = useState<NotificationList | null>(
        null
    )
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()

    useEffect(() => {
        ;(async () => {
            setIsPending(true)
            const result = await getNotifications()
            setNotifications(result)
            setIsPending(false)
        })()
    }, [])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" disabled={isPending}>
                    <Bell />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 overflow-hidden w-64">
                {notifications?.length == 0 && (
                    <p className="text-sm p-4 font-bold">
                        Não há notificações.
                    </p>
                )}
                {notifications?.map((notification, i) => {
                    const timezone =
                        Intl.DateTimeFormat().resolvedOptions().timeZone
                    const notificationDate = new TZDate(
                        notification.createdAt,
                        timezone
                    )
                    const today = new TZDate(new Date(), timezone)
                    return (
                        <PopoverClose asChild>
                            <button
                                onClick={async () => {
                                    await markNotificationAsRead(
                                        notification.id
                                    )
                                    router.push(notification.href)
                                }}
                                key={i}
                                className={`cursor-pointer p-4 text-start transition-colors text-sm w-full ${
                                    !notification.isRead && 'bg-foreground/5'
                                } hover:bg-foreground/10`}
                            >
                                <span>
                                    <b>{notification.user}</b>{' '}
                                    {notification.message}
                                </span>
                                <small className="block text-foreground/50">
                                    {formatRelative(notificationDate, today, {
                                        locale: ptBR,
                                    })}
                                </small>
                            </button>
                        </PopoverClose>
                    )
                })}
            </PopoverContent>
        </Popover>
    )
}
