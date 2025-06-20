'use client'

import Link from 'next/link'
import { NavbarOptions } from './options'
import { useMediaQuery } from '@/hooks/use-media-query'
import { MobileNavbar } from './mobile'

export function Navbar() {
    const isMobile = useMediaQuery('(max-width: 768px)')

    if (isMobile) return <MobileNavbar />

    return (
        <nav className="flex justify-between items-center gap-4">
            <Link href="/" className="text-2xl font-bold">
                MPost
            </Link>
            <NavbarOptions />
        </nav>
    )
}
