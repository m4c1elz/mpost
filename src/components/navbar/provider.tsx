'use client'

import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from 'react'

interface NavbarContextType {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const NavbarContext = createContext<NavbarContextType | null>(null)

export function NavbarProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    return <NavbarContext value={{ open, setOpen }}>{children}</NavbarContext>
}

export function useNavbar() {
    const context = useContext(NavbarContext)
    if (!context) {
        throw new Error(
            'useNavbar can only be used inside of a </NavbarProvider>'
        )
    }

    return context
}
