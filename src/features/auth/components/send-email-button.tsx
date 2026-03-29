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
import { useTranslations } from 'next-intl'

interface SendEmailButtonProps extends ComponentProps<'button'> {
    sendEmailAction: () => Promise<any> // eslint-disable-line
    timeoutAfterDispatch?: number
}

export function SendEmailButton({
    sendEmailAction,
    timeoutAfterDispatch = 5,
    ...props
}: SendEmailButtonProps) {
    const [state, action, isLoading] = useActionState(
        sendEmailAction,
        undefined,
    )
    const [sendTimeout, setSendTimeout] = useState(0)
    const { toast } = useToast()
    const [_, startTransition] = useTransition()
    const t = useTranslations('auth.sendMailButton')

    useEffect(() => {
        if (state && state.success) {
            toast({
                title: t('onSent.title'),
                description: t('onSent.description'),
            })
        } else if (state && !state.success) {
            toast({
                title: t('onFail.title'),
                description: t('onFail.description'),
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
                ? t('sending')
                : `${t('sendMail')} ${sendTimeout > 0 ? `(${sendTimeout})` : ''}`}
        </Button>
    )
}
