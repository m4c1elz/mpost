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
import { Trash } from 'lucide-react'

export function DeleteCommentButton() {
    return (
        <Dialog>
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
                    <Button variant="destructive">Apagar</Button>
                    <Button variant="secondary">Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
