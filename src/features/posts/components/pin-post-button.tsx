'use client'

import { Button } from '@/components/ui/button'
import { Loader2, Pin, PinOff } from 'lucide-react'
import { togglePin } from '../actions/toggle-pin'
import { useActionState, useEffect, useState, useTransition } from 'react'
import { useToast } from '@/hooks/use-toast'

type PinPostButtonProps = {
    id: number
    isPinned: boolean
}

export function PinPostButton({ id, isPinned }: PinPostButtonProps) {
    const [desiredAction, setDesiredAction] = useState(
        isPinned ? 'unpin' : 'pin',
    )

    const [state, action, isPending] = useActionState(
        togglePin.bind(null, id, desiredAction === 'unpin' ? false : true),
        undefined,
    )

    const [_, startTransition] = useTransition()
    const { toast } = useToast()

    useEffect(() => {
        if (state?.success) {
            setDesiredAction(desiredAction === 'unpin' ? 'pin' : 'unpin')

            toast({
                description:
                    desiredAction === 'pin'
                        ? 'Postagem fixada com sucesso.'
                        : 'Postagem desafixada com sucesso.',
            })
        }
    }, [state])

    return (
        <Button
            size="icon"
            variant="ghost"
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
        </Button>
    )
}
