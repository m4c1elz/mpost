'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider, useTheme } from 'next-themes'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

interface ClientProvidersProps {
    children: React.ReactNode
}

export function ClientProviders({ children }: ClientProvidersProps) {
    const { resolvedTheme } = useTheme()

    return (
        <SessionProvider>
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
        </SessionProvider>
    )
}
