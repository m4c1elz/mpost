'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

interface ClientProvidersProps {
    children: React.ReactNode
}

export function ClientProviders({ children }: ClientProvidersProps) {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                enableSystem
                disableTransitionOnChange
            >
                <ProgressBar
                    color="#fff"
                    options={{ showSpinner: false }}
                    shallowRouting
                />
                {children}
            </ThemeProvider>
        </SessionProvider>
    )
}
