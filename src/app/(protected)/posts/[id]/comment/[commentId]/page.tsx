import { Post } from '@/components/post'
import { notFound } from 'next/navigation'
import { Comment } from '@/components/comment'
import { getComment } from './get-comment'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CommentPageProps {
    params: Promise<{ commentId: string }>
}

export default async function CommentPage({ params }: CommentPageProps) {
    const { commentId } = await params
    if (isNaN(Number(commentId))) {
        return notFound()
    }

    const comment = await getComment(Number(commentId))
    if (!comment) return notFound()

    if (comment.parent) {
        return (
            <div className="space-y-4">
                <p className="text-xl font-bold">Postagem original</p>
                <Post.Root>
                    <Post.Header>
                        <Post.UserInfo
                            atsign={comment.post.user.atsign}
                            username={comment.post.user.name}
                        />
                        <Post.DateTime
                            createdAt={comment.post.createdAt}
                            updatedAt={comment.post.updatedAt}
                        />
                    </Post.Header>
                    <Post.Content id={comment.post.id}>
                        {comment.post.content}
                    </Post.Content>
                </Post.Root>
                <Comment {...comment.parent} />
                <Button variant="link">
                    <Link href={`/posts/${comment.postId}`}>
                        Ver todos os comentários
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <p className="text-xl font-bold">Postagem original</p>
            <Post.Root>
                <Post.Header>
                    <Post.UserInfo
                        atsign={comment.post.user.atsign}
                        username={comment.post.user.name}
                    />
                    <Post.DateTime
                        createdAt={comment.post.createdAt}
                        updatedAt={comment.post.updatedAt}
                    />
                </Post.Header>
                <Post.Content id={comment.post.id}>
                    {comment.post.content}
                </Post.Content>
            </Post.Root>
            <Comment {...comment} />
            <Button variant="link">
                <Link href={`/posts/${comment.postId}`}>
                    Ver todos os comentários
                </Link>
            </Button>
        </div>
    )
}
