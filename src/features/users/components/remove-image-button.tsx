'use client'

import { Button } from '@/components/ui/button'
import { useActionState, useEffect, useTransition } from 'react'
import { removeProfilePicture } from '../actions/remove-profile-picture'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

export function RemoveImageButton() {
    const [state, action, isPending] = useActionState(
        removeProfilePicture,
        undefined,
    )

    const [_, startTransition] = useTransition()
    const { toast } = useToast()
    const { update } = useSession()
    const t = useTranslations('settings.options.user.profilePic')

    async function handleStateChange() {
        if (!state) return

        if (state.success) {
            toast({
                title: t('onRemoveSuccess.title'),
                description: t('onRemoveSuccess.description'),
            })
            await update({ dummyData: true })
        } else {
            toast({
                title: t('onRemoveError.title'),
                description: state.error ?? t('onRemoveError.description'),
                variant: 'destructive',
            })
        }
    }

    useEffect(() => {
        handleStateChange()
    }, [state])

    return (
        <Button
            variant="destructive"
            onClick={() => startTransition(action)}
            disabled={isPending}
        >
            {isPending ? (
                <>
                    <Loader2 className="animate-spin" />{' '}
                    {t('buttons.removeImageButton.pending')}
                </>
            ) : (
                t('buttons.removeImageButton.normal')
            )}
        </Button>
    )
}
