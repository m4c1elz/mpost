'use client'

import Link, { LinkProps } from 'next/link'
import { useSettingsNavbar } from './provider'

export function SettingsNavbarLink(
    props: LinkProps & { children: React.ReactNode }
) {
    const { setOpen } = useSettingsNavbar()

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
