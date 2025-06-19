'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Form from 'next/form'

type ProfilePictureFormProps = {
    imageUrl?: string | null
    userInitialsFallback: string
}

export function ProfilePictureForm({
    imageUrl,
    userInitialsFallback,
}: ProfilePictureFormProps) {
    return (
        <Form action={() => {}} className="space-y-2">
            <Avatar className="m-auto my-2 size-32">
                <AvatarImage src={imageUrl ?? ''} alt="Foto de perfil" />
                <AvatarFallback className="text-2xl">
                    {userInitialsFallback}
                </AvatarFallback>
            </Avatar>
            <Input type="file" />
            <Button type="submit" className="w-min">
                Enviar
            </Button>
        </Form>
    )
}
