import Link from 'next/link'
import { Button } from '../ui/button'
import { NotificationsButton } from '@/features/notifications/components/notifications-button'
import { Plus, Settings, History } from 'lucide-react'
import { UserDropdown } from './user-dropdown'

export function DesktopNavbar() {
    return (
        <nav
            id="desktop-nav"
            className="hidden justify-between items-center gap-4 md:flex"
            suppressHydrationWarning
        >
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
                    <Button variant="link" asChild>
                        <Link href="/updates">
                            <History /> Atualizações
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
