'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { formatRelativeDate } from '@/helpers/format-relative-date'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Geist } from 'next/font/google'
import Link from 'next/link'
import { PropsWithChildren, useState } from 'react'
import { createContext, useContext } from 'react'

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
    const [] = useState<PostContextType>({ id, content })

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

export function PostContent({
    children,
    asLink = true,
}: PropsWithChildren & { asLink?: boolean }) {
    const { id } = usePost()

    const Root = ({ children }: PropsWithChildren) =>
        asLink ? <Link href={`/posts/${id}`}>{children}</Link> : <>{children}</>

    return (
        <Root>
            <article
                className={`${geist.className} whitespace-pre-line text-wrap break-anywhere`}
            >
                {children}
            </article>
        </Root>
    )
}

export function PostDate({
    date,
    isEdited = false,
}: {
    date: Date | string
    isEdited?: boolean
}) {
    return (
        <time
            dateTime={new Date(date).toISOString()}
            className="text-foreground/50 text-xs sm:text-sm"
        >
            {formatRelativeDate(new Date(date))} {isEdited && '(editado)'}
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
