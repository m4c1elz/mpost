import { Link } from '@/i18n/navigation'
import { Button, ButtonProps } from './ui/button'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function PostButton(props: ButtonProps) {
    const t = useTranslations('home.navbar.buttons')

    return (
        <Button {...props} asChild>
            <Link href="/posts/create">
                <Plus /> {t('post')}
            </Link>
        </Button>
    )
}
