import { notFound, redirect } from 'next/navigation'
import { auth } from '@/auth'
import { Metadata } from 'next'
import { Post } from '@/features/posts/components/post'
import { AddCommentForm } from '@/features/posts/components/add-comment-form'
import { Comment } from '@/features/posts/components/comment'
import { getPostById } from '@/features/posts/services/get-post-by-id'
import { getInitials } from '@/helpers/get-initials'
import { getPostComments } from '@/features/posts/services/get-post-comments'
import { AppPagination } from '@/components/app-pagination'

interface PostPageProps {
    params: Promise<{ id: string }>
    searchParams: Promise<{ page: string }>
}

export async function generateMetadata({
    params,
}: PostPageProps): Promise<Metadata> {
    const post = await getPostById(Number((await params).id))

    if (!post) return {}

    return {
        title: `${post.content} | MPost`,
        description: `Veja a postagem de ${post.user.name}`,
    }
}

export default async function PostPage({
    params,
    searchParams,
}: PostPageProps) {
    const { id } = await params
    const { page } = await searchParams

    const parsedPage = isNaN(Number(page)) ? 1 : Number(page)

    if (isNaN(Number(id))) {
        return redirect('/')
    }

    const [post, comments] = await Promise.all([
        getPostById(Number(id)),
        getPostComments(Number(id), parsedPage),
    ])

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
                        imageFallback={getInitials(post.user.name)}
                        imageUrl={post.user.image}
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
            {comments.data.map(comment => (
                <Comment {...comment} postId={post.id} key={comment.id} />
            ))}

            {comments.pagination.totalPages > 1 && (
                <AppPagination
                    page={comments.pagination.page}
                    totalPages={comments.pagination.totalPages}
                />
            )}
        </div>
    )
}
