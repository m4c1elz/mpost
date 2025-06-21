'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function SettingsNavbarLink(
    props: LinkProps & { children: React.ReactNode }
) {
    const pathname = usePathname()

    const isActive = pathname == props.href

    return (
        <Link
            {...props}
            className={cn(
                'px-4 py-2 w-[90%] hover:bg-foreground/10 rounded transition font-medium text-sm',
                isActive && 'bg-foreground/10'
            )}
        >
            {props.children}
        </Link>
    )
}
