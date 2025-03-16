'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider, useTheme } from 'next-themes'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/react-query'

interface ClientProvidersProps {
    children: React.ReactNode
}

export function ClientProviders({ children }: ClientProvidersProps) {
    const { resolvedTheme } = useTheme()
    const queryClient = getQueryClient()

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    attribute="class"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <ProgressBar
                        color={resolvedTheme === 'light' ? 'black' : 'white'}
                        options={{ showSpinner: false }}
                        shallowRouting
                    />
                </ThemeProvider>
            </QueryClientProvider>
        </SessionProvider>
    )
}
