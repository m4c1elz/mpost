import { Link } from '@/i18n/navigation'
import { MapPinX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getTranslations } from 'next-intl/server'

export default async function NotFound() {
    const t = await getTranslations('common.notFound')

    return (
        <main className="text-center h-96 grid place-content-center space-y-4">
            <h1 className="text-2xl font-bold mb-4">MPost</h1>
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
