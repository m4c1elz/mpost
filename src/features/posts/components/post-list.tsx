import { auth } from '@/auth'
import { Post } from './post'

type PostType = {
    user: {
        name: string
        atsign: string
    }
    id: number
    content: string
    createdAt: Date
    updatedAt: Date | null
}

type PostListProps = {
    posts: PostType[]
}

export async function PostList({ posts }: PostListProps) {
    const session = await auth()

    if (posts.length === 0) {
        return <p className="text-center">Não há postagens. Ainda!</p>
    }

    return posts.map(post => {
        const isPostFromCurrentUser = post.user.atsign === session?.user.atsign

        return (
            <Post.Root key={post.id}>
                <Post.Header>
                    <Post.UserInfo
                        atsign={post.user.atsign}
                        username={post.user.name}
                    />
                    <Post.DateTime
                        createdAt={post.createdAt}
                        updatedAt={post.updatedAt}
                    />
                </Post.Header>
                <Post.Content
                    id={post.id}
                    isPostFromCurrentUser={isPostFromCurrentUser}
                >
                    {post.content}
                </Post.Content>
            </Post.Root>
        )
    })
}
