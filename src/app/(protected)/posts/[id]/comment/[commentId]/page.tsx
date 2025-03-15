import { Post } from '@/components/post'
import { notFound } from 'next/navigation'
import { Comment } from '@/components/comment'
import { getComment } from './get-comment'

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
            <p className="text-xl font-bold">Comentário em destaque</p>
            <Comment {...comment} />
        </div>
    )
}
