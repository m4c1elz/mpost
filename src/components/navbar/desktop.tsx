import { Link } from '@/i18n/navigation'
import { Button } from '../ui/button'
import { NotificationsButton } from '@/features/notifications/components/notifications-button'
import { Settings, History } from 'lucide-react'
import { UserDropdown } from './user-dropdown'
import { PostButton } from '../post-button'
import { useTranslations } from 'next-intl'

export function DesktopNavbar() {
    const t = useTranslations('home.navbar.buttons')

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
                    <PostButton />
                </li>
                <li>
                    <Button variant="link" asChild>
                        <Link href="/settings/user">
                            <Settings /> {t('settings')}
                        </Link>
                    </Button>
                </li>
                <li>
                    <Button variant="link" asChild>
                        <Link href="/updates">
                            <History /> {t('updates')}
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
