'use client'

import { Button } from '@/components/ui/button'
import { useActionState, useEffect, useTransition } from 'react'
import { removeProfilePicture } from '../actions/remove-profile-picture'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useSession } from 'next-auth/react'

export function RemoveImageButton() {
    const [state, action, isPending] = useActionState(
        removeProfilePicture,
        undefined
    )

    const [_, startTransition] = useTransition()
    const { toast } = useToast()
    const { update } = useSession()

    useEffect(() => {
        if (!state) return

        if (state.success) {
            toast({
                title: 'Imagem removida.',
                description:
                    'Talvez demore um pouco até que as mudanças se apliquem.',
            })
        } else {
            toast({
                title: 'Erro ao remover imagem.',
                description: state.error,
            })
            update({ dummyData: true })
        }
    }, [state])

    return (
        <Button
            variant="destructive"
            onClick={() => startTransition(action)}
            disabled={isPending}
        >
            {isPending ? (
                <>
                    <Loader2 className="animate-spin" /> Removendo...
                </>
            ) : (
                'Remover Imagem'
            )}
        </Button>
    )
}
