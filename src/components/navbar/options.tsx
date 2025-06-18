'use client'

// components
import { Menu, Plus, X, Settings } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

// other
import { cn } from '@/lib/utils'
import { NotificationsButton } from '../../features/notifications/components/notifications-button'
import { useNavbar } from './provider'
import { UserDropdown } from './user-dropdown'

export function NavbarOptions() {
    const { open, setOpen } = useNavbar()

    return (
        <>
            <Menu className="md:hidden" onClick={() => setOpen(true)} />
            <div
                className={cn(
                    'size-full absolute inset-0 z-10 transition-opacity bg-black/50 md:static md:size-auto md:bg-none md:opacity-100 md:pointer-events-none',
                    open
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                )}
            >
                <ul
                    className={cn(
                        'transition-all duration-200 absolute flex flex-col gap-6 items-end w-1/2 bg-background border-l h-screen top-0 font-medium px-4 py-2',
                        'md:flex-row md:bg-none md:border-none md:static md:w-auto md:h-auto md:items-center md:pointer-events-auto',
                        open ? 'right-0' : '-right-96'
                    )}
                >
                    <X onClick={() => setOpen(false)} className="md:hidden" />
                    <li>
                        <Button asChild>
                            <Link
                                onClick={() => setOpen(false)}
                                href="/posts/create"
                            >
                                <Plus /> Criar Postagem
                            </Link>
                        </Button>
                    </li>
                    <li>
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
            </div>
        </>
    )
}
