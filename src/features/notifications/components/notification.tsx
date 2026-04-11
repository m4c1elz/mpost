import { PopoverClose } from '@radix-ui/react-popover'
import { useRouter } from 'next-nprogress-bar'
import { useMutation } from '@tanstack/react-query'
import { cn } from '@/lib/utils'
import { getQueryClient } from '@/lib/react-query'
import { markNotificationAsRead } from '../services/mark-notification-as-read'
import { useFormatter, useNow, useTranslations } from 'next-intl'
import { $Enums } from '@prisma/client'

interface NotificationProps {
    id: string
    user: string
    action: $Enums.NotificationType
    href: string
    createdAt: string
    isRead: boolean
}

export function Notification({
    id,
    user,
    action,
    href,
    createdAt,
    isRead,
}: NotificationProps) {
    const router = useRouter()
    const queryClient = getQueryClient()

    const formatter = useFormatter()
    const now = useNow()

    const t = useTranslations('notifications')

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
        router.push(href)
    }

    const messages: Record<$Enums.NotificationType, string> = {
        CommentedOnPost: t('commentedOnPost'),
        RepliedComment: t('repliedComment'),
    }

    return (
        <PopoverClose key={id} asChild>
            <button
                onClick={handleClick}
                className={cn(
                    'cursor-pointer p-4 text-start transition-colors text-sm w-full hover:bg-foreground/10',
                    !isRead && 'bg-foreground/5',
                )}
            >
                <span>
                    <b>{user}</b> {messages[action]}
                </span>
                <small className="block text-foreground/50">
                    {formatter.relativeTime(new Date(createdAt), now)}
                </small>
            </button>
        </PopoverClose>
    )
}

// helper function
function sleep(ms: number) {
    return new Promise(r => setTimeout(r, ms))
}
