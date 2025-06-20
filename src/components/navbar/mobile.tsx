'use client'

import { Menu, Plus, Settings } from 'lucide-react'
import { Button } from '../ui/button'
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '../ui/sheet'
import Link from 'next/link'
import { NotificationsButton } from '@/features/notifications/components/notifications-button'
import { UserDropdown } from './user-dropdown'
import { useState } from 'react'

export function MobileNavbar() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="flex justify-between items-center gap-4">
            <Link href="/" className="text-2xl font-bold">
                MPost
            </Link>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-1/2">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <ul className="grid grid-cols-2 gap-4 place-items-center mx-auto">
                        <li className="col-span-2">
                            <Button asChild>
                                <Link
                                    onClick={() => setOpen(false)}
                                    href="/posts/create"
                                >
                                    <Plus /> Postar
                                </Link>
                            </Button>
                        </li>
                        <li className="col-span-2">
                            <Button variant="link" asChild>
                                <Link
                                    href="/settings/user"
                                    onClick={() => setOpen(false)}
                                >
                                    <Settings /> Opções
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <NotificationsButton />
                        </li>
                        <li>
                            <UserDropdown />
                        </li>
                    </ul>
                </SheetContent>
            </Sheet>
        </nav>
    )
}
