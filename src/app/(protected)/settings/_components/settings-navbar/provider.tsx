'use client'

import {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useContext,
} from 'react'

interface SettingsNavbarContextType {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const SettingsNavbarContext = createContext<SettingsNavbarContextType | null>(
    null
)

export function SettingsNavbarProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [open, setOpen] = useState(false)

    return (
        <SettingsNavbarContext value={{ open, setOpen }}>
            {children}
        </SettingsNavbarContext>
    )
}

export function useSettingsNavbar() {
    const context = useContext(SettingsNavbarContext)
    if (!context) {
        throw new Error(
            'useSettingsNavbar should only be used inside of an <SettingsNavbarContext />.'
        )
    }

    return context
}
