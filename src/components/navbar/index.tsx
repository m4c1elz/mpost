import Link from 'next/link'
import { NavbarOptions } from './options'

export function Navbar() {
    return (
        <nav className="flex justify-between items-center gap-4">
            <Link href="/" className="text-2xl font-bold">
                MPost
            </Link>
            <NavbarOptions />
        </nav>
    )
}
