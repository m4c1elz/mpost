'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, X, Settings } from 'lucide-react'
import Link, { LinkProps } from 'next/link'
import { useState } from 'react'

export function SettingsNavbar() {
    const [open, setOpen] = useState(false)

    const baseClassName =
        'transition border-r flex flex-col gap-4 items-start w-1/2 absolute h-screen z-10 top-0 bg-background pt-12 sm:pt-0 sm:opacity-100 sm:static sm:md:h-[600px] sm:w-72 sm:pointer-events-auto before:w-screen before:h-screen before:bg-background/50 before:absolute before:-z-[1] before:inset-0 sm:before:bg-transparent sm:before:pointer-events-none'

    // local component for handling setOpen
    function SettingsNavbarLink(
        props: LinkProps & { children: React.ReactNode }
    ) {
        return (
            <Link
                {...props}
                className="px-4 py-2 w-[90%] hover:bg-foreground/10 rounded transition font-medium text-sm"
                onClick={() => setOpen(false)}
            >
                {props.children}
            </Link>
        )
    }

    return (
        <>
            <Button
                className="sm:hidden absolute"
                onClick={() => setOpen(!open)}
            >
                <ChevronLeft />
                <Settings />
            </Button>
            <nav
                className={`${baseClassName} ${
                    open
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                }`}
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
        </>
    )
}
