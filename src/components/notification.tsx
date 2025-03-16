import { PopoverClose } from '@radix-ui/react-popover'
import { useNavbar } from './navbar/provider'
import { useRouter } from 'next-nprogress-bar'
import { useMutation } from '@tanstack/react-query'
import { cn } from '@/lib/utils'
import { formatRelativeDate } from '@/helpers/format-relative-date'
import { getQueryClient } from '@/lib/react-query'
import { sleep } from '@/helpers/sleep'

async function markNotificationAsRead(id: string) {
    await fetch(`/api/notifications/${id}/read`, {
        method: 'PATCH',
    })
}

interface NotificationProps {
    id: string
    user: string
    message: string
    href: string
    createdAt: string
    isRead: boolean
}

export function Notification({
    id,
    user,
    message,
    href,
    createdAt,
    isRead,
}: NotificationProps) {
    const { setOpen: setNavbarOpen } = useNavbar()
    const router = useRouter()
    const queryClient = getQueryClient()

    const { mutateAsync: markAsRead } = useMutation({
        mutationFn: markNotificationAsRead,
    })

    async function handleClick() {
        if (!isRead) {
            await markAsRead(id)
            queryClient.invalidateQueries({
                queryKey: ['notifications'],
            })
        }
        await sleep(200)
        setNavbarOpen(false)
        router.push(href)
    }

    return (
        <PopoverClose key={id} asChild>
            <button
                onClick={handleClick}
                className={cn(
                    'cursor-pointer p-4 text-start transition-colors text-sm w-full hover:bg-foreground/10',
                    !isRead && 'bg-foreground/5'
                )}
            >
                <span>
                    <b>{user}</b> {message}
                </span>
                <small className="block text-foreground/50">
                    {formatRelativeDate(new Date(createdAt))}
                </small>
            </button>
        </PopoverClose>
    )
}
