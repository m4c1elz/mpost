import { getInitials } from '@/helpers/get-initials'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Loader2, ChevronDown } from 'lucide-react'
import { LogoutButton } from '../logout-button'
import { ThemeSwitch } from '../theme-switch'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useNavbar } from './provider'

export function UserDropdown() {
    const { data: session, update } = useSession()
    const { setOpen } = useNavbar()

    useEffect(() => {
        if (!session) {
            update()
        }
    }, [])

    const username = session?.user?.name
    const profilePic = session?.user?.image
    const atsign = session?.user?.atsign

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex gap-2 items-center cursor-pointer">
                <Avatar>
                    <AvatarFallback>
                        {username ? (
                            getInitials(username)
                        ) : (
                            <Loader2 className="animate-spin" />
                        )}
                    </AvatarFallback>
                    <AvatarImage src={profilePic ?? ''} alt="You!" />
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
    )
}
