import { PopoverClose } from '@radix-ui/react-popover'
import { useNavbar } from './navbar/provider'
import { TZDate } from '@date-fns/tz'
import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useRouter } from 'next-nprogress-bar'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cn } from '@/lib/utils'

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
    const queryClient = useQueryClient()

    // handling date
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const notificationDate = new TZDate(createdAt, timezone)
    const today = new TZDate(new Date(), timezone)

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
                    {formatRelative(notificationDate, today, {
                        locale: ptBR,
                    })}
                </small>
            </button>
        </PopoverClose>
    )
}
