'use client'

import { Button } from '@/components/ui/button'
import { useEffect, useState, ComponentProps } from 'react'

interface ButtonWithDelayProps extends ComponentProps<'button'> {
    wasSubmitted?: boolean
    timeoutAfterSubmit?: number
    isLoading?: boolean
}

export function ButtonWithDelay({
    wasSubmitted,
    timeoutAfterSubmit = 5,
    isLoading = false,
    ...props
}: ButtonWithDelayProps) {
    const [sendTimeout, setSendTimeout] = useState(0)

    useEffect(() => {
        if (wasSubmitted) {
            setSendTimeout(timeoutAfterSubmit)
        }
    }, [wasSubmitted, timeoutAfterSubmit])

    useEffect(() => {
        if (sendTimeout > 0) {
            const timer = setInterval(() => {
                setSendTimeout(prev => prev - 1)
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [sendTimeout])

    return (
        <Button
            type="submit"
            variant="secondary"
            disabled={isLoading || sendTimeout > 0}
            {...props}
        >
            {isLoading
                ? props.children
                : `${props.children} ${
                      sendTimeout > 0 ? `(${sendTimeout})` : ''
                  }`}
        </Button>
    )
}
