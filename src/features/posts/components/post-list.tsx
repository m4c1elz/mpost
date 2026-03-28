'use client'

import { Post } from './post'
import { getInitials } from '@/helpers/get-initials'
import { DeletePostButton } from './delete-post-button'
import { EditPostButton } from './edit-post-button'
import { PinPostButton } from './pin-post-button'
import { useSession } from 'next-auth/react'
import { useIsMobile } from '@/hooks/use-is-mobile'

type PostType = {
    user: {
        name: string
        atsign: string
        image: string | null
    }
    id: number
    content: string
    createdAt: Date
    updatedAt: Date | null
    isPinned?: boolean
}

type PostListProps = {
    posts: PostType[]
    showIsPinnedHighlight?: boolean
}

export function PostList({ posts, showIsPinnedHighlight }: PostListProps) {
    const { data } = useSession({ required: true })
    const isMobile = useIsMobile()

    if (posts.length === 0) {
        return <p className="text-center">Não há postagens. Ainda!</p>
    }

    console.log({ isMobile })

    return posts.map(post => {
        const isPostFromCurrentUser = post.user.atsign === data?.user.atsign

        return (
            <Post.Root key={post.id}>
                {showIsPinnedHighlight && post.isPinned && (
                    <small className="block bg-foreground/10 px-2 py-1 w-fit rounded-sm">
                        Postagem fixada
                    </small>
                )}
                <Post.Header>
                    <Post.UserInfo
                        atsign={post.user.atsign}
                        username={post.user.name}
                        imageUrl={post.user.image}
                        imageFallback={getInitials(post.user.name)}
                    />
                    {!isMobile && <Post.DateTime {...post} />}
                </Post.Header>
                <Post.Content
                    id={post.id}
                    isPostFromCurrentUser={isPostFromCurrentUser}
                    isPinned={post.isPinned}
                >
                    {post.content}
                </Post.Content>
                {isMobile && <Post.DateTime {...post} />}
                {isPostFromCurrentUser && (
                    <Post.Footer>
                        <div className="flex gap-2 items-center">
                            <EditPostButton
                                id={post.id}
                                originalPostContent={post.content}
                            />
                            <DeletePostButton id={post.id} />
                        </div>
                        <PinPostButton
                            id={post.id}
                            isPinned={post.isPinned ?? false}
                        />
                    </Post.Footer>
                )}
            </Post.Root>
        )
    })
}
