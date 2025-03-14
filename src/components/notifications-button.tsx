import { Bell } from 'lucide-react'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Notification } from './notification'
import { useEffect, useState } from 'react'

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

export function NotificationsButton() {
    const [notifications, setNotifications] = useState<NotificationList | null>(
        null
    )
    const [isPending, setIsPending] = useState(false)

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
                {notifications?.map(notification => (
                    <Notification key={notification.id} {...notification} />
                ))}
            </PopoverContent>
        </Popover>
    )
}
