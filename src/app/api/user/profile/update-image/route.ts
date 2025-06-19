import { changeUserProfilePicture } from '@/features/users/services/change-user-profile-picture'
import { r2 } from '@/lib/cloudflare'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'node:crypto'
import { env } from '@/env'
import { auth } from '@/auth'

export async function POST(req: Request) {
    const session = await auth()
    if (!session) {
        return Response.json({ error: 'Dados inválidos.' })
    }

    const { name, type } = (await req.json()) as { name: string; type: string }

    if (!name && !type) {
        return Response.json({ error: 'Dados inválidos.' })
    }

    const imageKey = randomUUID().concat('-').concat(name)

    const command = new PutObjectCommand({
        Bucket: env.CLOUDFLARE_BUCKET_NAME,
        ContentType: type,
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
