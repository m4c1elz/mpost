'use client'

import { Button } from '@/components/ui/button'
import {
    useActionState,
    useEffect,
    useState,
    ComponentProps,
    useTransition,
} from 'react'
import { useToast } from '@/hooks/use-toast'

interface SendEmailButtonProps extends ComponentProps<'button'> {
    sendEmailAction: () => Promise<any>
    timeoutAfterDispatch?: number
}

export function SendEmailButton({
    sendEmailAction,
    timeoutAfterDispatch = 5,
    ...props
}: SendEmailButtonProps) {
    const [state, action, isLoading] = useActionState(
        sendEmailAction,
        undefined
    )
    const [sendTimeout, setSendTimeout] = useState(0)
    const { toast } = useToast()
    const [_, startTransition] = useTransition()

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
        <Button
            type="submit"
            variant="secondary"
            disabled={isLoading || sendTimeout > 0}
            onClick={() => startTransition(action)}
            {...props}
        >
            {isLoading
                ? 'Enviando...'
                : `Enviar E-mail ${sendTimeout > 0 ? `(${sendTimeout})` : ''}`}
        </Button>
    )
}
