import { Toaster } from '@/components/ui/toaster'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="w-screen h-screen grid place-content-center space-y-4">
                <h1 className="text-2xl font-bold text-center">MPost</h1>
                {children}
            </div>
            <Toaster />
        </>
    )
}
