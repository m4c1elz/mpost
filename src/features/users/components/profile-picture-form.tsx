'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { uploadProfilePicture } from '../services/upload-profile-picture'
import { useToast } from '@/hooks/use-toast'
import { useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import { uploadProfilePictureSchema } from '../schemas/upload-profile-picture-schema'
import { RemoveImageButton } from './remove-image-button'
import { getInitials } from '@/helpers/get-initials'
import { useTranslations } from 'next-intl'

export function ProfilePictureForm() {
    const [image, setImage] = useState<File | null>(null)
    const { toast } = useToast()
    const { update, data: session, status: sessionStatus } = useSession()
    const t = useTranslations('settings.options.user.profilePic')

    const { mutateAsync, isPending } = useMutation({
        mutationFn: uploadProfilePicture,
        onSuccess: async () => {
            toast({
                title: t('onSuccess.title'),
                description: t('onSuccess.description'),
            })
            // update() requires at least one argument to actually update user session
            await update({ dummy: true })
        },
        onError: err => {
            toast({
                title: t('onError.title'),
                description: err.message ?? t('onError.description'),
                variant: 'destructive',
            })
        },
    })

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (!image) {
            toast({ description: t('noImageSelectedError') })
            return
        }

        const { data: validatedImage, error } =
            uploadProfilePictureSchema(t).safeParse(image)

        if (error) {
            toast({
                title: t('onError.title'),
                description: error.flatten().formErrors,
                variant: 'destructive',
            })
            return
        }

        await mutateAsync(validatedImage)
    }

    return (
        <form className="space-y-2" onSubmit={handleSubmit}>
            <Avatar className="m-auto my-2 size-32">
                <AvatarImage src={session?.user.image!} alt="Foto de perfil" />
                <AvatarFallback className="text-2xl">
                    {sessionStatus === 'loading' ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        getInitials(session?.user.name ?? '')
                    )}
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
            <div className="flex gap-2 items-center">
                <Button type="submit" className="w-min" disabled={isPending}>
                    {isPending ? (
                        <>
                            <Loader2 className="animate-spin" />{' '}
                            {t('buttons.sendButton.pending')}
                        </>
                    ) : (
                        t('buttons.sendButton.normal')
                    )}
                </Button>
                <RemoveImageButton />
            </div>
        </form>
    )
}
