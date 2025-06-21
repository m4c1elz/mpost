import { changeUserProfilePicture } from '@/features/users/services/change-user-profile-picture'
import { r2 } from '@/lib/cloudflare'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'node:crypto'
import { env } from '@/env'
import { auth } from '@/auth'
import { uploadProfilePictureSchema } from '@/features/users/schemas/upload-profile-picture-schema'

export async function POST(req: Request) {
    const session = await auth()
    if (!session) {
        return Response.json({ error: 'Dados inválidos.' }, { status: 400 })
    }

    const recievedImage = (await req.formData()).get('image')

    const { data: image, error } =
        uploadProfilePictureSchema.safeParse(recievedImage)

    if (!image && error) {
        return Response.json({ error: 'Dados inválidos.' }, { status: 400 })
    }

    const imageKey = randomUUID().concat('-').concat(image.name)

    const arrayBuffer = await image.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const command = new PutObjectCommand({
        Bucket: env.CLOUDFLARE_BUCKET_NAME,
        ContentType: image.type,
        Key: imageKey,
        Body: buffer,
    })

    try {
        await Promise.all([
            r2.send(command),
            changeUserProfilePicture(session.user.id!, imageKey),
        ])

        return Response.json({ message: 'Sucesso' }, { status: 201 })
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
