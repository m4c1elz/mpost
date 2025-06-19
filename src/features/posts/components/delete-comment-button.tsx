import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog'
import { Loader2, Trash } from 'lucide-react'
import { useActionState, useEffect, useState, useTransition } from 'react'
import { deleteComment } from '../actions/delete-comment'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

type DeleteCommentButtonProps = {
    id: number
}

export function DeleteCommentButton({ id }: DeleteCommentButtonProps) {
    const boundDeleteCommentAction = deleteComment.bind(null, id)

    const [state, action, isPending] = useActionState(
        boundDeleteCommentAction,
        undefined
    )
    const [_, startTransition] = useTransition()
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    useEffect(() => {
        if (!state) return

        if (state.success) {
            setOpen(false)
            router.refresh()

            toast({
                description: 'Comentário removido.',
            })
        } else {
            toast({
                description: 'Erro ao remover comentário.',
            })
        }
    }, [state])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Trash className="text-destructive" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apagar comentário</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir este comentário?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="destructive"
                        onClick={() => startTransition(action)}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" /> Apagando...
                            </>
                        ) : (
                            'Apagar'
                        )}
                    </Button>
                    <Button variant="secondary">Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
