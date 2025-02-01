import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import Link from 'next/link'

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="space-y-12">
            <h1 className="text-2xl font-bold">Opções</h1>
            <div className="flex gap-6">
                <nav className="pr-12 h-[600px] border-r flex flex-col gap-4 items-start w-72">
                    <Button variant="ghost" className="w-full" asChild>
                        <Link href="/settings/user">Usuário</Link>
                    </Button>
                    <Button variant="ghost" className="w-full" asChild>
                        <Link href="/settings/appearance">Aparência</Link>
                    </Button>
                </nav>
                {children}
            </div>
            <Toaster />
        </div>
    )
}
