'use client'

import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

type TopBannerProps = PropsWithChildren

export function TopBanner({ children }: TopBannerProps) {
    const pathname = usePathname()

    if (pathname == '/')
        return (
            <header className="border-b border-b-foreground/30 text-card-foreground flex gap-2 justify-center items-center py-2 text-sm md:text-base">
                {children}
            </header>
        )
}
