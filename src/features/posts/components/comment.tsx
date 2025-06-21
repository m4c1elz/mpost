'use client'

import {
    type Comment as CommentType,
    type User as UserType,
} from '@prisma/client'
import { Post } from './post'
import { Button } from '@/components/ui/button'
import { Loader2, MessageSquareText } from 'lucide-react'
import { AddCommentForm } from './add-comment-form'
import { GetRepliesResponse, useComment } from './comment.hooks'
import { useSession } from 'next-auth/react'
import { DeleteCommentButton } from './delete-comment-button'
import { getInitials } from '@/helpers/get-initials'
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'

export interface CommentProps extends Omit<CommentType, 'userId'> {
    user: Pick<UserType, 'name' | 'atsign' | 'image'>
    children: {
        id: number
    }[]
}

export function Comment({
    user,
    id,
    content,
    postId,
    children,
    parentId,
    createdAt,
    updatedAt,
}: CommentProps) {
    const { data } = useSession()
    const isCommentFromCurrentUser = user.atsign === data?.user.atsign

    const {
        hasReplies,
        setHasReplies,
        formElementRef,
        formOpen,
        setFormOpen,
        repliesHidden,
        setRepliesHidden,
        repliesQuery,
        isHighlighted,
    } = useComment({
        initialHasReplies: children.length > 0,
        commentId: id,
        parentId,
    })

    async function handleFetchReplies() {
        if (!repliesQuery.isFetched) await repliesQuery.refetch()
        setRepliesHidden(false)
    }

    return (
        <div className="space-y-2">
            <Post.Root>
                {isHighlighted && (
                    <small className="block bg-foreground/10 px-2 py-1 w-fit rounded-sm">
                        Comentário em destaque
                    </small>
                )}
                <Post.Header>
                    <Post.UserInfo
                        atsign={user.atsign}
                        username={user.name}
                        imageUrl={user.image}
                        imageFallback={getInitials(user.name)}
                    />

                    <Post.DateTime
                        createdAt={createdAt}
                        updatedAt={updatedAt}
                    />
                </Post.Header>
                <Post.Content id={id} asLink={false}>
                    {content}
                </Post.Content>
                <div className="flex justify-between items-center">
                    <Button
                        onClick={() => setFormOpen(!formOpen)}
                        size="icon"
                        variant="ghost"
                    >
                        <MessageSquareText className="text-foreground/50" />
                    </Button>
                    {isCommentFromCurrentUser && (
                        <DeleteCommentButton id={id} />
                    )}
                </div>
                {formOpen && (
                    <AddCommentForm
                        ref={formElementRef}
                        postId={postId}
                        parentId={id}
                        onSuccess={() => {
                            repliesQuery.refetch()
                            if (!hasReplies) setHasReplies(true)
                            setFormOpen(false)
                            setRepliesHidden(false)
                        }}
                    />
                )}
            </Post.Root>
            {hasReplies && (repliesHidden || repliesQuery.isLoading) && (
                <Button onClick={handleFetchReplies} variant="outline">
                    {repliesQuery.isLoading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        'Mostrar respostas'
                    )}
                </Button>
            )}
            {!repliesHidden && repliesQuery.data && (
                <div className="flex gap-4 mt-2">
                    <button
                        className="transition-all cursor-pointer w-1 rounded bg-foreground/20 h-auto hover:w-2"
                        onClick={() => setRepliesHidden(true)}
                    />
                    <CommentReplies repliesQuery={repliesQuery} />
                </div>
            )}
        </div>
    )
}

function CommentReplies({
    repliesQuery,
}: {
    repliesQuery: UseInfiniteQueryResult<InfiniteData<GetRepliesResponse>>
}) {
    return (
        <div className="space-y-1 flex-1">
            {repliesQuery.data?.pages.map(page => (
                <div key={page.pagination.page} className="space-y-2">
                    {page.data.map(comment => (
                        <Comment key={comment.id} {...comment} />
                    ))}
                </div>
            ))}
            {repliesQuery.hasNextPage && (
                <Button
                    onClick={() => repliesQuery.fetchNextPage()}
                    disabled={repliesQuery.isFetchingNextPage}
                    variant="outline"
                >
                    {repliesQuery.isFetchingNextPage ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        'Carregar mais comentários'
                    )}
                </Button>
            )}
        </div>
    )
}
