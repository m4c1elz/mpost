'use client'

import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { SettingsNavbarLink } from './settings-navbar-link'
import { availableSettings } from '../available-settings'

export function DesktopSettingsNavbar() {
    return (
        <nav className="border-r flex flex-col gap-4 items-start w-72 h-[700px] z-10 top-0 bg-background">
            <Button variant="ghost" size="icon" className="sm:hidden">
                <X />
            </Button>

            {availableSettings.map(({ href, name }) => (
                <SettingsNavbarLink key={href} href={href}>
                    {name}
                </SettingsNavbarLink>
            ))}
        </nav>
    )
}
