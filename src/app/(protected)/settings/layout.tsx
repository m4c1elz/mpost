import { Toaster } from '@/components/ui/toaster'
import { SettingsNavbar } from './_components/settings-navbar'

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Opções</h1>
            <div className="flex gap-6">
                <SettingsNavbar />
                <div className="mt-12 w-full md:mt-0 md:w-auto">{children}</div>
            </div>
            <Toaster />
        </div>
    )
}
