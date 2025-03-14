import { Navbar } from '@/components/navbar'
import { NavbarProvider } from '@/components/navbar/provider'
import { Toaster } from '@/components/ui/toaster'

interface ProtectedLayoutProps {
    children: React.ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    return (
        <NavbarProvider>
            <div className="px-6 py-4 md:px-16 md:py-6">
                <Navbar />
                <main className="mt-6">{children}</main>
            </div>
            <Toaster />
        </NavbarProvider>
    )
}
