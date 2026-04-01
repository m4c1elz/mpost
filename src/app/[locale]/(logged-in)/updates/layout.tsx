import { getTranslations } from 'next-intl/server'
import { Geist } from 'next/font/google'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

type UpdatesLayoutProps = {
    children: React.ReactNode
}

export default async function UpdatesLayout({ children }: UpdatesLayoutProps) {
    const t = await getTranslations('updates')

    return (
        <div
            className={
                geistSans.className +
                ' prose prose-sm prose-headings:text-foreground prose-strong:text-foreground text-foreground prose-a:text-primary m-auto md:prose-base md:w-[800px]'
            }
        >
            <h1>{t('title')}</h1>
            {children}
        </div>
    )
}
