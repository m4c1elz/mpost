import { Toaster } from '@/components/ui/toaster'
import { MobileSettingsNavbarTrigger } from '@/features/settings/components/mobile-settings-navbar-trigger'
import { DesktopSettingsNavbar } from '@/features/settings/components/desktop-settings-navbar'

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="space-y-6">
            <div className="flex gap-2 items-center">
                <div className="block md:hidden">
                    <MobileSettingsNavbarTrigger />
                </div>
                <h1 className="text-2xl font-bold">Opções</h1>
            </div>
            <div className="flex gap-6">
                <div className="hidden md:block">
                    <DesktopSettingsNavbar />
                </div>
                <div className="w-full md:w-auto">{children}</div>
            </div>
            <Toaster />
        </div>
    )
}
