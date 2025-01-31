import { Geist } from 'next/font/google'
import Link from 'next/link'
import { DeletePostButton } from '../delete-post-button'
import { EditPostButton } from '../edit-post-button'

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
                    <EditPostButton
                        id={id}
                        originalPostContent={children?.toString()}
                    />
                    <DeletePostButton id={id} />
                </div>
            )}
        </>
    )
}
