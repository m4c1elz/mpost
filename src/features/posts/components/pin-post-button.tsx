'use client'

import { Loader2, Pin, PinOff } from 'lucide-react'
import { togglePin } from '../actions/toggle-pin'
import { useActionState, useEffect, useState, useTransition } from 'react'
import { useToast } from '@/hooks/use-toast'
import { PostAction, usePost } from './post'
import { useTranslations } from 'next-intl'

export function PinPostButton() {
    const { id, isPinned } = usePost()

    const [desiredAction, setDesiredAction] = useState(
        isPinned ? 'unpin' : 'pin',
    )

    const [state, action, isPending] = useActionState(
        togglePin.bind(null, id, desiredAction === 'unpin' ? false : true),
        undefined,
    )

    const [_, startTransition] = useTransition()
    const { toast } = useToast()

    const t = useTranslations('posts.pins')

    useEffect(() => {
        if (state?.success) {
            setDesiredAction(desiredAction === 'unpin' ? 'pin' : 'unpin')

            toast({
                description:
                    desiredAction === 'pin' ? t('onPinText') : t('onUnpinText'),
            })
        }
    }, [state])

    return (
        <PostAction
            onClick={() => startTransition(action)}
            disabled={isPending}
        >
            {isPending ? (
                <Loader2 className="animate-spin" />
            ) : isPinned ? (
                <PinOff />
            ) : (
                <Pin />
            )}
        </PostAction>
    )
}
