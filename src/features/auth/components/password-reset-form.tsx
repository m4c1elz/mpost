'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState, useEffect, useState } from 'react'
import { sendResetPasswordEmail } from '../actions/send-reset-password-email'
import { ButtonWithDelay } from './button-with-delay'
import { useToast } from '@/hooks/use-toast'

export function PasswordResetForm() {
    const [wasSubmitted, setWasSubmitted] = useState(false)

    const [state, action, isPending] = useActionState(
        sendResetPasswordEmail,
        undefined
    )

    const { toast } = useToast()

    useEffect(() => {
        if (!state) return

        if (state.success) {
            toast({
                title: 'E-mail enviado.',
                description: 'Verifique sua caixa de entrada.',
            })
        } else if (state.error) {
            toast({
                title: 'Erro ao enviar e-mail!',
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
                placeholder="fulanodetal@gmail.com"
                required
            />
            <ButtonWithDelay wasSubmitted={wasSubmitted} isLoading={isPending}>
                {isPending ? 'Enviando...' : 'Enviar e-mail'}
            </ButtonWithDelay>
        </form>
    )
}
