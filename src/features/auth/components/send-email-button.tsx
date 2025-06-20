'use client'

import { Button } from '@/components/ui/button'
import { useActionState, useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'

interface SendEmailButtonProps {
    sendEmailAction: () => Promise<any>
    timeoutAfterDispatch?: number
}

export function SendEmailButton({
    sendEmailAction,
    timeoutAfterDispatch = 5,
}: SendEmailButtonProps) {
    const [state, action, isLoading] = useActionState(
        sendEmailAction,
        undefined
    )
    const [sendTimeout, setSendTimeout] = useState(0)
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

        if (state) setSendTimeout(timeoutAfterDispatch)
    }, [state])

    async function handleTimeout() {
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (sendTimeout > 0) {
            setSendTimeout(prev => prev - 1)
        }
    }

    useEffect(() => {
        handleTimeout()
    }, [sendTimeout, handleTimeout])

    return (
        <div className="text-center">
            <form action={action}>
                <Button
                    type="submit"
                    variant="secondary"
                    disabled={isLoading || sendTimeout > 0}
                >
                    {isLoading
                        ? 'Enviando...'
                        : `Enviar E-mail ${
                              sendTimeout > 0 ? `(${sendTimeout})` : ''
                          }`}
                </Button>
            </form>
        </div>
    )
}
