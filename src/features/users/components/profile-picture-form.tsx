'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { getUploadPresignedUrl } from '../services/get-upload-presigned-url'
import { useToast } from '@/hooks/use-toast'
import { useSession } from 'next-auth/react'

type ProfilePictureFormProps = {
    imageUrl?: string | null
    userInitialsFallback: string
}

async function postImageToBucket(url: string, image: File) {
    const response = await fetch(url, {
        method: 'PUT',
        body: image,
    })

    if (!response.ok) {
        throw new Error('Erro ao enviar imagem.')
    }
}

export function ProfilePictureForm({
    imageUrl,
    userInitialsFallback,
}: ProfilePictureFormProps) {
    const [image, setImage] = useState<File | null>(null)
    const { toast } = useToast()
    const { update } = useSession()

    const { mutateAsync } = useMutation({
        mutationFn: async (image: File) => {
            const url = await getUploadPresignedUrl({
                name: image.name,
                type: image.type,
            })
            await postImageToBucket(url, image)
        },
        onSuccess: async () => {
            toast({
                title: 'Imagem atualizada com sucesso.',
                description:
                    'Talvez demore até que a imagem apareça para alguns usuários.',
            })
            // update() requires at least one argument to actually update user session
            await update({ dummy: true })
        },
        onError: err => {
            toast({
                title: 'Erro ao atualizar imagem!',
                description: err.message,
            })
        },
    })

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (!image) return
        await mutateAsync(image)
    }

    return (
        <form className="space-y-2" onSubmit={handleSubmit}>
            <Avatar className="m-auto my-2 size-32">
                <AvatarImage src={imageUrl ?? ''} alt="Foto de perfil" />
                <AvatarFallback className="text-2xl">
                    {userInitialsFallback}
                </AvatarFallback>
            </Avatar>
            <Input
                type="file"
                name="image"
                onChange={e => {
                    if (e.target.files && e.target.files.length > 0) {
                        setImage(e.target.files[0])
                    }
                }}
            />
            <Button type="submit" className="w-min">
                Enviar
            </Button>
        </form>
    )
}
