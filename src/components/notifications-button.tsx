import { Bell, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Notification } from './notification'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

type NotificationList = {
    id: string
    user: string
    message: string
    href: string
    createdAt: string
    isRead: boolean
}[]

async function getNotifications() {
    const response = await fetch('/api/notifications')

    if (!response.ok) {
        throw new Error('Error finding notifications')
    }

    const result: NotificationList = await response.json()
    return result
}

export function NotificationsButton() {
    const [hasUnseenNotifications, setHasUnseenNotifications] = useState(false)

    const { data: notifications, isPending } = useQuery({
        queryKey: ['notifications'],
        queryFn: getNotifications,
        refetchInterval: 2 * 60 * 1000,
    })

    useEffect(() => {
        if (notifications) {
            const hasUnseen = notifications.some(n => !n.isRead)
            setHasUnseenNotifications(hasUnseen)
        }
    }, [notifications])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        'relative',
                        hasUnseenNotifications &&
                            'after:size-2 after:absolute after:bg-amber-600 after:rounded-full after:top-1 after:right-1'
                    )}
                >
                    <Bell />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-64 max-h-70 overflow-auto">
                {isPending && <Loader2 className="animate-spin mx-auto my-2" />}
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
