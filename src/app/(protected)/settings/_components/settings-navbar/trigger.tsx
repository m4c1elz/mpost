'use client'

import { EllipsisVertical } from 'lucide-react'
import { useSettingsNavbar } from './provider'

export function SettingsNavbarTrigger() {
    const { open, setOpen } = useSettingsNavbar()

    return (
        <EllipsisVertical
            className="sm:hidden"
            onClick={() => setOpen(!open)}
        />
    )
}
