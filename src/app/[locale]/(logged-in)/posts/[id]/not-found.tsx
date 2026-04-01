import Link from 'next/link'
import { MapPinX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export default function PostNotFound() {
    const t = useTranslations('posts.notFound')

    return (
        <main className="text-center h-96 grid place-content-center space-y-4">
            <MapPinX className="text-destructive mx-auto mb-2" size={50} />
            <div>
                <h1 className="text-xl font-bold">{t('title')}</h1>
                <p className="font-medium">{t('description')}</p>
            </div>
            <Button variant="link" asChild>
                <Link href="/">{t('backToHomeLink')}</Link>
            </Button>
        </main>
    )
}
