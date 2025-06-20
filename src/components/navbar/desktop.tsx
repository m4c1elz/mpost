import Link from 'next/link'
import { Button } from '../ui/button'
import { NotificationsButton } from '@/features/notifications/components/notifications-button'
import { Plus, Settings } from 'lucide-react'
import { UserDropdown } from './user-dropdown'

export function DesktopNavbar() {
    return (
        <nav className="flex justify-between items-center gap-4">
            <Link href="/" className="text-2xl font-bold">
                MPost
            </Link>
            <ul className="flex gap-6 items-center">
                <li>
                    <Button asChild>
                        <Link href="/posts/create">
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
                    <NotificationsButton />
                </li>
                <li>
                    <UserDropdown />
                </li>
            </ul>
        </nav>
    )
}
