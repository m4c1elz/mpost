import { Geist } from 'next/font/google'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

export default function MdxLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            className={
                geistSans.className +
                ' prose prose-sm prose-headings:text-foreground prose-strong:text-foreground text-foreground prose-a:text-primary m-auto md:prose-base md:w-[800px]'
            }
        >
            <h1>Atualizações</h1>
            {children}
        </div>
    )
}
