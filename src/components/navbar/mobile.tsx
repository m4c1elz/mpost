'use client'

import { Settings, History } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { NotificationsButton } from '@/features/notifications/components/notifications-button'
import { UserDropdown } from './user-dropdown'

export function MobileNavbar() {
    return (
        <nav
            className="sticky top-0 flex justify-between items-center gap-4"
            suppressHydrationWarning
        >
            <Link href="/" className="text-2xl font-bold">
                MPost
            </Link>
            <div className="flex gap-3.5 items-center">
                <NotificationsButton />
                <Button variant="link" size="icon" asChild>
                    <Link href="/settings/user">
                        <Settings />
                    </Link>
                </Button>
                <Button variant="link" size="icon" asChild>
                    <Link href="/updates">
                        <History />
                    </Link>
                </Button>
                <UserDropdown />
            </div>
        </nav>
    )
}
