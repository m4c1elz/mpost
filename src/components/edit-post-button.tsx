'use client'

import { useActionState, useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from './ui/dialog'
import Form from 'next/form'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Edit, Loader2 } from 'lucide-react'
import { editPost } from '@/actions/post/edit-post'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface EditPostButtonProps {
    id: number
    originalPostContent?: string
}

export function EditPostButton({
    id,
    originalPostContent,
}: EditPostButtonProps) {
    const editPostAction = editPost.bind(null, id)

    const [open, setOpen] = useState(false)
    const [state, action, isPending] = useActionState(editPostAction, undefined)
    const { toast } = useToast()
    const router = useRouter()

    useEffect(() => {
        if (state && state.success) {
            setOpen(false)
            router.refresh()
            toast({
                description: 'Postagem editada.',
            })
        }
    }, [state])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar postagem</DialogTitle>
                </DialogHeader>
                <Form action={action} id="edit-post-form" className="space-y-2">
                    <Label htmlFor="content">Conteúdo da postagem</Label>
                    <Textarea
                        placeholder="hello world (editado!)"
                        name="content"
                        defaultValue={originalPostContent}
                    />
                    {state && (
                        <span className="text-sm text-destructive block">
                            {state.error}
                        </span>
                    )}
                </Form>
                <DialogFooter>
                    <Button
                        type="submit"
                        form="edit-post-form"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" /> Salvando...
                            </>
                        ) : (
                            'Editar'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
