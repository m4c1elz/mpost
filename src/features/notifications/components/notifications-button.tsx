import { Bell, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Notification } from './notification'
import { cn } from '@/lib/utils'
import { useNotificationsButton } from './notifications-button.hooks'

export function NotificationsButton() {
    const { data, isPending, hasUnseenNotifications, ref, isFetchingNextPage } =
        useNotificationsButton()

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
                    </div>
                ))}
                <div id="fetch-next-page-el" ref={ref}>
                    {isFetchingNextPage && (
                        <Loader2 className="animate-spin mx-auto my-2" />
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
