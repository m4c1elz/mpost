'use client'

import { useMediaQuery } from '@/hooks/use-media-query'
import { MobileNavbar } from './mobile'
import { DesktopNavbar } from './desktop'

export function Navbar() {
    const isMobile = useMediaQuery('(max-width: 768px)')

    if (isMobile) return <MobileNavbar />

    return <DesktopNavbar />
}
