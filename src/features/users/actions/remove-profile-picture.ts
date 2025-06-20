'use server'

import { auth } from '@/auth'
import { getUserByEmail } from '../services/get-user-by-email'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { env } from '@/env'
import { r2 } from '@/lib/cloudflare'
import { changeUserProfilePicture } from '../services/change-user-profile-picture'

export async function removeProfilePicture(_prevState: unknown) {
    const session = await auth()

    const user = await getUserByEmail(session?.user.email!)

    if (!user)
        return {
            success: false,
            error: 'Usuário não encontrado.',
        }

    const imageUrl = user.image

    if (!imageUrl) {
        return {
            success: false,
            error: 'Não há imagem para remover.',
        }
    }

    // get image key by its url
    const key = imageUrl.replace('https://', '').split('/')[1]

    const command = new DeleteObjectCommand({
        Bucket: env.CLOUDFLARE_BUCKET_NAME,
        Key: key,
    })

    try {
        await Promise.all([
            r2.send(command),
            changeUserProfilePicture(session?.user.id!),
        ])

        return {
            success: true,
            error: null,
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: 'Erro ao enviar a imagem.',
        }
    }
}
