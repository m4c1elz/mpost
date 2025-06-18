'use client'

import { EllipsisVertical } from 'lucide-react'
import { useSettingsNavbar } from './settings-navbar-provider'

export function SettingsNavbarTrigger() {
    const { open, setOpen } = useSettingsNavbar()

    return (
        <EllipsisVertical
            className="sm:hidden"
            onClick={() => setOpen(!open)}
        />
    )
}
