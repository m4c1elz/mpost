import { Geist } from 'next/font/google'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import { DeletePostButton } from '../delete-post-button'

const geist = Geist({
    subsets: ['latin'],
})

interface ContentProps {
    children: React.ReactNode
    id: number
    isPostFromCurrentUser?: boolean
    asLink?: boolean
}

export function Content({
    children,
    id,
    isPostFromCurrentUser,
    asLink = true,
}: ContentProps) {
    return (
        <>
            {asLink ? (
                <Link href={`/posts/${id}`} className="block">
                    <article
                        className={`${geist.className} whitespace-pre text-wrap break-words`}
                    >
                        {children}
                    </article>
                </Link>
            ) : (
                <div>
                    <article
                        className={`${geist.className} whitespace-pre text-wrap break-words`}
                    >
                        {children}
                    </article>
                </div>
            )}

            {isPostFromCurrentUser && (
                <div className="flex gap-2 items-center">
                    <DeletePostButton id={id} />
                </div>
            )}
        </>
    )
}
