interface HeaderProps {
    children: React.ReactNode
}

export function Header({ children }: HeaderProps) {
    return <div className="flex justify-between items-center">{children}</div>
}
