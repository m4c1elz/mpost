'use client'

import {
    type Comment as CommentType,
    type User as UserType,
} from '@prisma/client'
import { Post } from './post'
import { Button } from './ui/button'
import { Loader2, MessageSquareText } from 'lucide-react'
import { AddCommentForm } from '@/app/(protected)/posts/[id]/_components/add-comment-form'
import { useComment } from './comment.hooks'
import { useQuery } from '@tanstack/react-query'

interface CommentProps extends Omit<CommentType, 'userId'> {
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
}: CommentProps) {
    const {
        formElementRef,
        formOpen,
        setFormOpen,
        repliesHidden,
        setRepliesHidden,
    } = useComment()

    const hasReplies = children.length > 0

    const {
        data: replies,
        isLoading: isLoadingReplies,
        refetch: fetchReplies,
        isFetched,
    } = useQuery({
        enabled: false,
        queryKey: ['comment-replies', { commentId: id, parentId }],
        queryFn: () => getReplies(id),
    })

    return (
        <div className="space-y-2">
            <Post.Root>
                <Post.Header>
                    <Post.UserInfo atsign={user.atsign} username={user.name} />
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
                            setFormOpen(false)
                            setRepliesHidden(false)
                        }}
                    />
                )}
            </Post.Root>
            {hasReplies && repliesHidden && (
                <Button
                    onClick={async () => {
                        if (!isFetched) await fetchReplies()
                        setRepliesHidden(false)
                    }}
                    variant="outline"
                >
                    {isLoadingReplies ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        'Mostrar respostas'
                    )}
                </Button>
            )}
            {!repliesHidden && replies && (
                <div className="flex gap-4 mt-4">
                    <button
                        className="transition-all cursor-pointer w-1 rounded bg-foreground/20 h-auto hover:w-2"
                        onClick={() => setRepliesHidden(true)}
                    />
                    <div className="space-y-4 flex-1">
                        {replies.map(reply => (
                            <Comment key={reply.id} {...reply} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
