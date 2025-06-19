import { changeUserProfilePicture } from '@/features/users/services/change-user-profile-picture'
import { r2 } from '@/lib/cloudflare'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'node:crypto'
import { env } from '@/env'
import { auth } from '@/auth'

const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp']
const MAX_FILE_SIZE = 500 * 1024

export async function POST(req: Request) {
    const session = await auth()
    if (!session) {
        return Response.json({ error: 'Dados inválidos.' }, { status: 400 })
    }

    const image = (await req.formData()).get('image')

    if (!image || !(image instanceof File)) {
        return Response.json({ error: 'Dados inválidos.' }, { status: 400 })
    }

    if (!ALLOWED_IMAGE_TYPES.includes(image.type)) {
        return Response.json(
            {
                error: 'Tipo de arquivo inválido. Envie uma imagem.',
            },
            { status: 400 }
        )
    }

    if (image.size > MAX_FILE_SIZE) {
        return Response.json(
            { error: 'Envie uma imagem menor.' },
            { status: 400 }
        )
    }

    const imageKey = randomUUID().concat('-').concat(image.name)

    const command = new PutObjectCommand({
        Bucket: env.CLOUDFLARE_BUCKET_NAME,
        ContentType: image.type,
        Key: imageKey,
    })

    try {
        const [url] = await Promise.all([
            getSignedUrl(r2, command),
            changeUserProfilePicture(session.user.id!, imageKey),
        ])
        return Response.json({ url })
    } catch (error) {
        console.log(error)
        return Response.json(
            { error: 'Erro ao enviar imagem.' },
            {
                status: 500,
            }
        )
    }
}
