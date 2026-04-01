import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { TopBanner } from '@/components/top-banner'
import { Toaster } from '@/components/ui/toaster'
import { ChevronRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

interface ProtectedLayoutProps {
    children: React.ReactNode
}

export default async function ProtectedLayout({
    children,
}: ProtectedLayoutProps) {
    const t = await getTranslations('home.topBanner')

    return (
        <>
            <TopBanner>
                <span className="font-medium">{t('text')}</span>{' '}
                <Link
                    href="/updates/v1.3.0"
                    className="font-bold flex gap-1 items-center"
                >
                    {t('linkText')} <ChevronRight />
                </Link>
            </TopBanner>
            <div className="px-6 py-4 md:px-16 md:py-6">
                <Navbar />
                <main className="my-6">{children}</main>
                <Footer />
            </div>
            <Toaster />
        </>
    )
}
