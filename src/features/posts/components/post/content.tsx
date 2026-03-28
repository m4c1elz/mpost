import { Geist } from 'next/font/google'
import Link from 'next/link'
import { DeletePostButton } from '@/features/posts/components/delete-post-button'
import { EditPostButton } from '@/features/posts/components/edit-post-button'
import { PinPostButton } from '../pin-post-button'

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

            {isPostFromCurrentUser && (
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <EditPostButton
                            id={id}
                            originalPostContent={children?.toString()}
                        />
                        <DeletePostButton id={id} />
                    </div>
                    <PinPostButton id={id} isPinned={isPinned ?? false} />
                </div>
            )}
        </>
    )
}
