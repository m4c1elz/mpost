interface RootProps {
    children: React.ReactNode
}

export function Root({ children }: RootProps) {
    return (
        <div className="block border rounded space-y-2 px-4 py-2">
            {children}
        </div>
    )
}
