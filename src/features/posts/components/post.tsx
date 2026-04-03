'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Geist } from 'next/font/google'
import { Link } from '@/i18n/navigation'
import { PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'
import { useFormatter, useNow } from 'next-intl'

const geist = Geist({
    subsets: ['latin'],
})

type PostContextType = {
    id: number
    content: string
    isPinned?: boolean
    isEdited?: boolean
}

const PostContext = createContext<PostContextType | null>(null)

export function usePost() {
    const context = useContext(PostContext)

    if (!context) {
        throw new Error(
            'usePost() can only be used inside of a <PostContext/> component.',
        )
    }

    return context
}

export function Post({
    id,
    content,
    isPinned = false,
    isEdited = false,
    children,
}: PropsWithChildren & PostContextType) {
    return (
        <PostContext value={{ id, content, isPinned, isEdited }}>
            <div className="block border rounded space-y-2 px-4 py-2">
                {children}
            </div>
        </PostContext>
    )
}

export function PostHeader({ children }: PropsWithChildren) {
    return <div className="flex justify-between items-center">{children}</div>
}

export function PostHeaderGroup({ children }: PropsWithChildren) {
    return <div className="flex gap-2 items-center">{children}</div>
}

export function PostProfilePicture({
    src,
    alt,
    fallback,
}: {
    src: string | null
    alt: string
    fallback: string
}) {
    return (
        <Avatar className="size-8">
            <AvatarFallback className="text-sm">{fallback}</AvatarFallback>
            <AvatarImage src={src ?? undefined} alt={alt} />
        </Avatar>
    )
}

export function PostUsername({
    atsign,
    children,
}: PropsWithChildren & { atsign: string }) {
    return (
        <>
            <Link
                href={`/users/${atsign}`}
                className="font-bold line-clamp-1 hover:underline"
            >
                {children}
            </Link>
            <span className="text-foreground/50">@{atsign}</span>
        </>
    )
}

export function PostBadge({ children }: PropsWithChildren) {
    return (
        <small className="block bg-foreground/10 px-2 py-1 w-fit rounded-sm">
            {children}
        </small>
    )
}

// helper to define if the post should be a url or not
function PostContentRoot({
    renderLink,
    children,
}: { renderLink: boolean } & PropsWithChildren) {
    const { id } = usePost()

    return renderLink ? (
        <Link href={`/posts/${id}`}>{children}</Link>
    ) : (
        <>{children}</>
    )
}

export function PostContent({
    children,
    asLink = true,
}: PropsWithChildren & { asLink?: boolean }) {
    return (
        <PostContentRoot renderLink={asLink}>
            <article
                className={`${geist.className} whitespace-pre-line text-wrap break-anywhere`}
            >
                {children}
            </article>
        </PostContentRoot>
    )
}

export function PostDate({ date }: { date: Date | string }) {
    const { isEdited } = usePost()
    const formatter = useFormatter()
    const now = useNow()

    return (
        <time
            dateTime={new Date(date).toISOString()}
            className="text-foreground/50 text-xs sm:text-sm"
            suppressHydrationWarning
        >
            {formatter.relativeTime(new Date(date), now)}{' '}
            {isEdited && '(editado)'}
        </time>
    )
}

export function PostFooter({ children }: PropsWithChildren) {
    return (
        <footer className="flex justify-between items-center">
            {children}
        </footer>
    )
}

export function PostActionGroup({ children }: PropsWithChildren) {
    return <div className="flex gap-2 items-center">{children}</div>
}

export function PostAction(props: ButtonProps) {
    return <Button variant="ghost" size="icon" {...props} />
}
