'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from './ui/dialog'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Edit } from 'lucide-react'

interface EditPostButtonProps {
    id: number
    originalPostContent?: string
}

export function EditPostButton({
    id,
    originalPostContent,
}: EditPostButtonProps) {
    const [open, setOpen] = useState(false)

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
                <div className="space-y-2">
                    <Label htmlFor="content">Conteúdo da postagem</Label>
                    <Textarea
                        placeholder="hello world (editado!)"
                        name="content"
                        defaultValue={originalPostContent}
                    />
                </div>
                <DialogFooter>
                    <Button>Enviar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
