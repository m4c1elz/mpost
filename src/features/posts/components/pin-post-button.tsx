'use client'

import { Button } from '@/components/ui/button'
import { Loader2, Pin } from 'lucide-react'
import { pinPost } from '../actions/pin-post'
import { useActionState, useEffect, useTransition } from 'react'
import { useToast } from '@/hooks/use-toast'

type PinPostButtonProps = {
    id: number
}

export function PinPostButton({ id }: PinPostButtonProps) {
    const [state, action, isPending] = useActionState(
        pinPost.bind(null, id),
        undefined,
    )

    const [_, startTransition] = useTransition()
    const { toast } = useToast()

    useEffect(() => {
        if (state?.success) {
            toast({
                description: 'Postagem fixada com sucesso.',
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
            {isPending ? <Loader2 className="animate-spin" /> : <Pin />}
        </Button>
    )
}
