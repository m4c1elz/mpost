import { locales } from '@/i18n/locales'
import { ReactNode } from 'react'

type LocaleLayoutProps = {
    children: ReactNode
}

export default function LocaleLayout({ children }: LocaleLayoutProps) {
    return children
}

export function generateStaticParams() {
    return locales.map(locale => ({ locale }))
}
