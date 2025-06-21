'use client'

import { MobileNavbar } from './mobile'
import { DesktopNavbar } from './desktop'

export function Navbar() {
    return (
        <>
            <div className="block md:hidden">
                <MobileNavbar />
            </div>
            <div className="hidden md:block">
                <DesktopNavbar />
            </div>
        </>
    )
}
