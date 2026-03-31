'use client'

import { getInitials } from '@/helpers/get-initials'
import { DeletePostButton } from './delete-post-button'
import { EditPostButton } from './edit-post-button'
import { PinPostButton } from './pin-post-button'
import { useSession } from 'next-auth/react'
import {
    Post,
    PostActionGroup,
    PostBadge,
    PostContent,
    PostDate,
    PostFooter,
    PostHeader,
    PostHeaderGroup,
    PostProfilePicture,
    PostUsername,
} from './post'
import { useTranslations } from 'next-intl'

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
    showPinnedHighlight?: boolean
}

export function PostList({ posts, showPinnedHighlight }: PostListProps) {
    const { data } = useSession()
    const t = useTranslations('home.posts')

    if (posts.length === 0) {
        return <p className="text-center">{t('emptyText')}</p>
    }

    return posts.map(({ id, content, user, isPinned, createdAt }) => {
        const isPostFromCurrentUser = user.atsign === data?.user.atsign
        const contextValue = { id, content, isPinned }

        return (
            <Post key={id} {...contextValue}>
                {isPinned && showPinnedHighlight && (
                    <PostHeaderGroup>
                        <PostBadge>{t('pinnedPost')}</PostBadge>
                    </PostHeaderGroup>
                )}
                <PostHeader>
                    <PostHeaderGroup>
                        <PostProfilePicture
                            src={user.image}
                            alt={t('profilePictureAlt', { name: user.name })}
                            fallback={getInitials(user.name)}
                        />
                        <PostUsername atsign={user.atsign}>
                            {user.name}
                        </PostUsername>
                    </PostHeaderGroup>
                </PostHeader>
                <PostContent>{content}</PostContent>
                <PostDate date={createdAt} />
                <PostFooter>
                    {isPostFromCurrentUser && (
                        <PostActionGroup>
                            <EditPostButton />
                            <DeletePostButton />
                            <PinPostButton />
                        </PostActionGroup>
                    )}
                </PostFooter>
            </Post>
        )
    })
}
