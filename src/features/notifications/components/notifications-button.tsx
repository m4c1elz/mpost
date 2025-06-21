import { Bell, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Notification } from './notification'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { getNotifications } from '../services/get-notifications'

import { useInView } from 'react-intersection-observer'

export function NotificationsButton() {
    const [hasUnseenNotifications, setHasUnseenNotifications] = useState(false)

    const { data, isPending, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ['notifications'],
            queryFn: getNotifications,
            initialPageParam: 1,
            getNextPageParam: (lastPage, _, lastPageParam) => {
                if (lastPageParam < lastPage.pagination.totalPages) {
                    return lastPage.pagination.page + 1
                } else {
                    return null
                }
            },
        })

    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage])

    useEffect(() => {
        if (data) {
            data.pages.map(({ data: notifications }) => {
                const hasUnseen = notifications.some(n => !n.isRead)
                setHasUnseenNotifications(hasUnseen)
            })
        }
    }, [data])

    return (
        <Popover modal>
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
                {data?.pages.map(page => (
                    <div key={page.pagination.page}>
                        {page.data.length === 0 && (
                            <small className="font-bold block text-center p-2">
                                Não há notificações {':('}
                            </small>
                        )}
                        {page.data.map(notification => (
                            <Notification
                                key={notification.id}
                                {...notification}
                            />
                        ))}
                        <div ref={ref}>
                            {isFetchingNextPage && (
                                <Loader2 className="animate-spin mx-auto my-2" />
                            )}
                        </div>
                    </div>
                ))}
            </PopoverContent>
        </Popover>
    )
}
