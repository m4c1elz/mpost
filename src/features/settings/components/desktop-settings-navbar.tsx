'use client'

import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { SettingsNavbarLink } from './settings-navbar-link'

export function DesktopSettingsNavbar() {
    return (
        <nav className="border-r flex flex-col gap-4 items-start w-72 h-[700px] z-10 top-0 bg-background">
            <Button variant="ghost" size="icon" className="sm:hidden">
                <X />
            </Button>

            <SettingsNavbarLink href="/settings/user">
                Usuário
            </SettingsNavbarLink>
            <SettingsNavbarLink href="/settings/appearance">
                Aparência
            </SettingsNavbarLink>
        </nav>
    )
}
