'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState, useEffect, useState } from 'react'
import { sendResetPasswordEmail } from '../actions/send-reset-password-email'
import { ButtonWithDelay } from './button-with-delay'
import { useToast } from '@/hooks/use-toast'
import { useTranslations } from 'next-intl'

export function RequestPasswordResetForm() {
    const [wasSubmitted, setWasSubmitted] = useState(false)

    const [state, action, isPending] = useActionState(
        sendResetPasswordEmail,
        undefined,
    )

    const { toast } = useToast()

    const t = useTranslations('auth.sendMailButton')

    useEffect(() => {
        if (!state) return

        if (state.success) {
            toast({
                title: t('onSent.title'),
                description: t('onSent.description'),
            })
        } else if (state.error) {
            toast({
                title: t('onFail.title'),
                description: state.error,
                variant: 'destructive',
            })
        }

        setWasSubmitted(true)
    }, [state])

    return (
        <form className="space-y-4" action={action}>
            <Label htmlFor="email">E-mail</Label>
            <Input
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
                required
            />
            <ButtonWithDelay wasSubmitted={wasSubmitted} isLoading={isPending}>
                {isPending ? t('sending') : t('sendMail')}
            </ButtonWithDelay>
        </form>
    )
}
