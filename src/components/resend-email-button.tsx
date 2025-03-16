'use client'

import { Button } from '@/components/ui/button'
import { sendVerificationEmail } from '@/actions/email/send-verification-email'
import { useActionState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'

interface ResendButtonProps {
    id: string
    email: string
}

export function ResendEmailButton({ id, email }: ResendButtonProps) {
    const [state, action, isLoading] = useActionState(
        () => sendVerificationEmail(id, email),
        undefined
    )
    const { toast } = useToast()

    useEffect(() => {
        if (state && state.success) {
            toast({
                title: 'E-mail enviado',
                description: 'Verifique sua caixa de entrada.',
            })
        } else if (state && !state.success) {
            toast({
                title: 'Erro ao enviar e-mail',
                description:
                    'Não foi possível reenviar o e-mail. Aguarde um instante e tente novamente.',
                variant: 'destructive',
            })
        }
    }, [state])

    return (
        <div className="text-center">
            <form action={action}>
                <Button type="submit" variant="secondary" disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Reenviar E-mail'}
                </Button>
            </form>
        </div>
    )
}
