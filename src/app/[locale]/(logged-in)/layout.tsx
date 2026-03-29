import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { TopBanner } from '@/components/top-banner'
import { Toaster } from '@/components/ui/toaster'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface ProtectedLayoutProps {
    children: React.ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    return (
        <>
            <TopBanner>
                <span className="font-medium">v1.3.0 disponível agora.</span>{' '}
                <Link
                    href="/updates/v1.3.0"
                    className="font-bold flex gap-1 items-center"
                >
                    Veja mais <ChevronRight />
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
