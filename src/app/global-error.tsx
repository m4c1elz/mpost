'use client'

import { Geist } from 'next/font/google'
import { Button } from '@/components/ui/button'
import { NextIntlClientProvider, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

interface GlobalErrorProps {
    error: Error & { digest?: string }
    reset: () => void
    params: Promise<{ locale: string }>
}

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

export default function GlobalError({ reset }: GlobalErrorProps) {
    const { locale } = useParams<{ locale: string }>()

    return (
        <html
            lang="pt-br"
            className="overflow-x-hidden"
            suppressHydrationWarning
        >
            <body
                className={`${geistSans.className} min-h-screen overflow-x-hidden relative antialiased text-center grid place-content-center space-y-4`}
            >
                <NextIntlClientProvider locale={locale}>
                    <GlobalErrorBody reset={reset} />
                </NextIntlClientProvider>
            </body>
        </html>
    )
}

function GlobalErrorBody({ reset }: { reset: () => void }) {
    const t = useTranslations('globalError')

    return (
        <>
            <h1 className="text-2xl font-bold">{t('title')}</h1>
            <p>{t('description')}</p>
            <Button className="w-min m-auto" onClick={() => reset()}>
                {t('resetPageBtnLabel')}
            </Button>
        </>
    )
}
