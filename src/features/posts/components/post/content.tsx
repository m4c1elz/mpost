import { Geist } from 'next/font/google'
import Link from 'next/link'
import { DeletePostButton } from '@/features/posts/components/delete-post-button'
import { EditPostButton } from '@/features/posts/components/edit-post-button'

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
