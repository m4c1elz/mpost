import { Toaster } from '@/components/ui/toaster'
import { SettingsNavbar } from './_components/settings-navbar'
import { SettingsNavbarProvider } from './_components/settings-navbar/provider'
import { SettingsNavbarTrigger } from './_components/settings-navbar/trigger'

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <SettingsNavbarProvider>
            <div className="space-y-6">
                <div className="flex gap-2 items-center">
                    <SettingsNavbarTrigger />
                    <h1 className="text-2xl font-bold">Opções</h1>
                </div>
                <div className="flex gap-6">
                    <SettingsNavbar />
                    <div className="w-full md:w-auto">{children}</div>
                </div>
                <Toaster />
            </div>
        </SettingsNavbarProvider>
    )
}
