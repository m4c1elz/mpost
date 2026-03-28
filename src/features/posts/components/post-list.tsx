import { auth } from '@/auth'
import { Post } from './post'
import { getInitials } from '@/helpers/get-initials'

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

export async function PostList({
    posts,
    showIsPinnedHighlight,
}: PostListProps) {
    const session = await auth()

    if (posts.length === 0) {
        return <p className="text-center">Não há postagens. Ainda!</p>
    }

    return posts.map(post => {
        const isPostFromCurrentUser = post.user.atsign === session?.user.atsign

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
                    <Post.DateTime
                        createdAt={post.createdAt}
                        updatedAt={post.updatedAt}
                    />
                </Post.Header>
                <Post.Content
                    id={post.id}
                    isPostFromCurrentUser={isPostFromCurrentUser}
                    isPinned={post.isPinned}
                >
                    {post.content}
                </Post.Content>
            </Post.Root>
        )
    })
}
