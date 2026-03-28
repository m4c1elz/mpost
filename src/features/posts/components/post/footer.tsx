import { PropsWithChildren } from 'react'

type FooterProps = PropsWithChildren

export function Footer({ children }: FooterProps) {
    return <div className="flex justify-between items-center">{children}</div>
}
