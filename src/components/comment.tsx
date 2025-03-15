'use client'

import {
    type Comment as CommentType,
    type User as UserType,
} from '@prisma/client'
import { Post } from './post'
import { Button } from './ui/button'
import { Loader2, MessageSquareText } from 'lucide-react'
import { AddCommentForm } from './add-comment-form'
import { useComment } from './comment.hooks'
import { useQuery } from '@tanstack/react-query'

export interface CommentProps extends Omit<CommentType, 'userId'> {
    user: Pick<UserType, 'name' | 'atsign'>
    children: {
        id: number
    }[]
}

async function getReplies(commentId: number) {
    const response = await fetch(`/api/comments/${commentId}/replies`)

    if (!response.ok) {
        throw new Error('Error finding comment replies')
    }

    const result: CommentProps[] = await response.json()
    return result
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
                    <Post.UserInfo atsign={user.atsign} username={user.name} />

                    <Post.DateTime
                        createdAt={createdAt}
                        updatedAt={updatedAt}
                    />
                </Post.Header>
                <Post.Content id={id} asLink={false}>
                    {content}
                </Post.Content>
                <div className="flex gap-2 items-center text-foreground/50">
                    <Button
                        onClick={() => setFormOpen(!formOpen)}
                        size="icon"
                        variant="ghost"
                    >
                        <MessageSquareText />
                    </Button>
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
                    <div className="space-y-1 flex-1">
                        {repliesQuery.data.map(reply => (
                            <Comment key={reply.id} {...reply} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
