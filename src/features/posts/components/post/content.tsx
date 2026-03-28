import { Geist } from 'next/font/google'
import Link from 'next/link'

const geist = Geist({
    subsets: ['latin'],
})

interface ContentProps {
    children: React.ReactNode
    id: number
    isPostFromCurrentUser?: boolean
    asLink?: boolean
    isPinned?: boolean
}

export function Content({
    children,
    id,
    isPostFromCurrentUser,
    asLink = true,
    isPinned,
}: ContentProps) {
    return (
        <>
            {asLink ? (
                <Link href={`/posts/${id}`} className="block">
                    <article
                        className={`${geist.className} whitespace-pre-line text-wrap break-anywhere`}
                    >
                        {children}
                    </article>
                </Link>
            ) : (
                <article
                    className={`${geist.className} whitespace-pre-line text-wrap break-anywhere`}
                >
                    {children}
                </article>
            )}
        </>
    )
}
