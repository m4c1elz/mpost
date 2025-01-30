'use client'

import { Post } from '@/components/post'
import { MessageSquareText } from 'lucide-react'
import { AddCommentForm } from '../add-comment-form'
import { Button } from '@/components/ui/button'
import { useCommentList } from './hooks'

type CommentType = {
    id: number
    user: {
        name: string
        atsign: string
    }
    createdAt: Date
    updatedAt: Date
    content: string
    parentId: number | null
}

export function CommentList({
    comment,
    postId,
    className,
    commentGroup,
}: {
    comment: CommentType
    postId: number
    className?: string
    commentGroup: Record<string | number, CommentType[]>
}) {
    const {
        formOpen,
        setFormOpen,
        formElementRef,
        repliesHidden,
        setRepliesHidden,
    } = useCommentList()

    const replies = commentGroup[comment.id]

    return (
        <div className={className}>
            <Post.Root>
                <Post.Header>
                    <Post.UserInfo
                        atsign={comment.user.atsign}
                        username={comment.user.name}
                    />
                </Post.Header>
                <Post.Content id={comment.id} asLink={false}>
                    {comment.content}
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
                        parentId={comment.id}
                        onSuccess={() => {
                            setFormOpen(false)
                            setRepliesHidden(false)
                        }}
                    />
                )}
            </Post.Root>
            {replies?.length > 0 && repliesHidden && (
                <Button
                    onClick={() => setRepliesHidden(!repliesHidden)}
                    className="mt-2"
                    variant="outline"
                >
                    Mostrar respostas
                </Button>
            )}
            {!repliesHidden && (
                <div className="flex gap-4 mt-4">
                    <button
                        className="transition-all w-1 rounded bg-foreground/20 h-auto hover:w-2"
                        onClick={() => setRepliesHidden(true)}
                    />
                    <div className="space-y-4 flex-1">
                        {replies?.map(reply => (
                            <CommentList
                                key={reply.id}
                                comment={reply}
                                postId={postId}
                                commentGroup={commentGroup}
                                className="flex-1"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
