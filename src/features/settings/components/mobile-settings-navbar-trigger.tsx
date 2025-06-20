import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { EllipsisVertical } from 'lucide-react'
import { SettingsNavbarLink } from './settings-navbar-link'

export function MobileSettingsNavbarTrigger() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <EllipsisVertical />
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Mais opções</SheetTitle>
                </SheetHeader>
                <div className="w-full flex flex-col gap-4 px-4">
                    <SheetClose asChild>
                        <SettingsNavbarLink href="/settings/user">
                            <SheetClose>Usuário</SheetClose>
                        </SettingsNavbarLink>
                    </SheetClose>
                    <SheetClose asChild>
                        <SettingsNavbarLink href="/settings/appearance">
                            Aparência
                        </SettingsNavbarLink>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    )
}
