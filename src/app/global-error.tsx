'use client'

import { Geist } from 'next/font/google'
import { Button } from '@/components/ui/button'

interface GlobalErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

export default function GlobalError({ reset }: GlobalErrorProps) {
    return (
        <html
            lang="pt-br"
            className="overflow-x-hidden"
            suppressHydrationWarning
        >
            <body
                className={`${geistSans.className} min-h-screen overflow-x-hidden relative antialiased text-center grid place-content-center space-y-4`}
            >
                <h1 className="text-2xl font-bold">Opa! Algo deu errado.</h1>
                <p>
                    Um erro desconhecido acabou de acontecer. Tente recarregar a
                    página ou voltar mais tarde.
                </p>
                <Button className="w-min m-auto" onClick={() => reset()}>
                    Reiniciar a página
                </Button>
            </body>
        </html>
    )
}
