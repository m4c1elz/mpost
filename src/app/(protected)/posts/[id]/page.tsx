import { Post } from '@/components/post'
import { notFound, redirect } from 'next/navigation'
import { AddCommentForm } from '@/components/add-comment-form'
import { getPost } from './_services/get-post'
import { auth } from '@/auth'
import { Metadata } from 'next'
import { Comment } from '@/components/comment'

interface PostPageProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({
    params,
}: PostPageProps): Promise<Metadata> {
    const post = await getPost(Number((await params).id))

    if (!post) return {}

    return {
        title: `${post.content} | MPost`,
        description: `Veja a postagem de ${post.user.name}`,
    }
}

export default async function PostPage({ params }: PostPageProps) {
    const { id } = await params

    if (isNaN(Number(id))) {
        return redirect('/')
    }

    const post = await getPost(Number(id))

    if (!post) {
        return notFound()
    }
    const session = await auth()
    const isPostFromCurrentUser = session?.user.atsign == post.user.atsign

    return (
        <div className="space-y-4">
            <p className="text-xl font-bold">Postagem</p>
            <Post.Root>
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
            <AddCommentForm postId={post.id} />
            {post.comments.map(comment => (
                <Comment {...comment} postId={post.id} key={comment.id} />
            ))}
        </div>
    )
}
