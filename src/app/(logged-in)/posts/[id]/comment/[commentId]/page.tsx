import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Comment } from '@/features/posts/components/comment'
import Link from 'next/link'
import { getCommentById } from '@/features/posts/services/get-comment-by-id'
import { getInitials } from '@/helpers/get-initials'
import {
    Post,
    PostHeader,
    PostHeaderGroup,
    PostProfilePicture,
    PostUsername,
    PostContent,
    PostDate,
} from '@/features/posts/components/post'

interface CommentPageProps {
    params: Promise<{ commentId: string }>
}

export default async function CommentPage({ params }: CommentPageProps) {
    const { commentId } = await params
    if (isNaN(Number(commentId))) {
        return notFound()
    }

    const comment = await getCommentById(Number(commentId))
    if (!comment) return notFound()

    return (
        <div className="space-y-4">
            <p className="text-xl font-bold">Postagem original</p>

            <Post {...comment.post}>
                <PostHeader>
                    <PostHeaderGroup>
                        <PostProfilePicture
                            src={comment.post.user.image}
                            alt={`${comment.post.user.name}'s Profile Picture`}
                            fallback={getInitials(comment.post.user.name)}
                        />
                        <PostUsername atsign={comment.post.user.atsign}>
                            {comment.post.user.name}
                        </PostUsername>
                    </PostHeaderGroup>
                </PostHeader>
                <PostContent asLink={false}>{comment.post.content}</PostContent>
                <PostDate date={comment.post.createdAt} />
            </Post>
            {comment.parent ? (
                <Comment {...comment.parent} />
            ) : (
                <Comment {...comment} />
            )}
            <Button variant="link">
                <Link href={`/posts/${comment.postId}`}>
                    Ver todos os comentários
                </Link>
            </Button>
        </div>
    )
}
