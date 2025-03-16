import { prisma } from '@/lib/prisma'
import { revalidateTag } from 'next/cache'

type Params = Promise<{ id: string }>

export async function PATCH(_req: Request, { params }: { params: Params }) {
    const { id } = await params

    await prisma.notification.update({
        where: { id },
        data: {
            isRead: true,
        },
    })

    revalidateTag('notifications')
    return new Response(null, {
        status: 200,
    })
}
