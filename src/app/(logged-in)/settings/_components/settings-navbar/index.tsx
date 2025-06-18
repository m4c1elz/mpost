'use client'

import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { SettingsNavbarLink } from './link'
import { useSettingsNavbar } from './provider'
import { cn } from '@/lib/utils'

export function SettingsNavbar() {
    const { open, setOpen } = useSettingsNavbar()

    return (
        <nav
            className={cn(
                'transition border-r flex flex-col gap-4 items-start w-1/2 absolute h-screen z-10 top-0 bg-background pt-12',
                'sm:pt-0 sm:opacity-100 sm:static sm:md:h-[600px] sm:w-72 sm:pointer-events-auto',
                'before:w-screen before:h-screen before:bg-background/50 before:absolute before:-z-1 before:inset-0 sm:before:bg-transparent sm:before:pointer-events-none',
                {
                    'opacity-100 pointer-events-auto': open,
                    'opacity-0 pointer-events-none': !open,
                }
            )}
        >
            <Button
                variant="ghost"
                size="icon"
                className="sm:hidden"
                onClick={() => setOpen(false)}
            >
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
