'use client'

// components
import { ChevronDown, Loader2, Menu, Plus, X, Settings } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { LogoutButton } from './logout-button'
import { ThemeSwitch } from './theme-switch'

// hooks
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

// other
import { getInitials } from '@/helpers/get-initials'

export function NavbarOptions() {
    const { data: session, update } = useSession()

    useEffect(() => {
        if (!session) {
            update()
        }
    }, [])

    const [open, setOpen] = useState(false)

    const username = session?.user?.name
    const profilePic = session?.user?.image
    const atsign = session?.user?.atsign

    return (
        <>
            <Menu className="md:hidden" onClick={() => setOpen(true)} />
            <div
                className={`size-full absolute inset-0 transition-opacity bg-black/50 md:static md:size-auto md:bg-none md:opacity-100 md:pointer-events-none ${
                    open
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                }`}
            >
                <ul
                    className={`transition-all duration-200 absolute flex flex-col gap-6 items-end w-1/2 bg-background border-l h-screen ${
                        open ? 'right-0' : '-right-96'
                    } top-0 font-medium px-4 py-2 md:flex-row md:bg-none md:border-none md:static md:w-auto md:h-auto md:items-center md:pointer-events-auto`}
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
                            <Link href="/settings/user">
                                <Settings /> Opções
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger className="flex gap-2 items-center">
                                <Avatar>
                                    <AvatarFallback>
                                        {username ? (
                                            getInitials(username)
                                        ) : (
                                            <Loader2 className="animate-spin" />
                                        )}
                                    </AvatarFallback>
                                    <AvatarImage
                                        src={profilePic ?? ''}
                                        alt="You!"
                                    />
                                </Avatar>
                                <ChevronDown />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className="font-bold">
                                    {username}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-bold">
                                    {atsign ? (
                                        <Link
                                            onClick={() => setOpen(false)}
                                            href={`/users/${atsign}`}
                                            className="text-sky-500 underline underline-offset-2"
                                        >
                                            Ver perfil
                                        </Link>
                                    ) : (
                                        <Loader2 className="animate-spin" />
                                    )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="font-bold flex-col items-start">
                                    <p>Tema</p>
                                    <ThemeSwitch />
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <LogoutButton />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </li>
                </ul>
            </div>
        </>
    )
}
