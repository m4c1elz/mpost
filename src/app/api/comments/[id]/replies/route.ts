import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

type Params = Promise<{ id: string }>

export async function GET(_request: Request, { params }: { params: Params }) {
    const { id } = await params

    if (isNaN(Number(id))) {
        return notFound()
    }

    const replies = await prisma.comment.findMany({
        where: {
            parentId: Number(id),
        },
        select: {
            id: true,
            user: {
                select: {
                    id: true,
                    atsign: true,
                    name: true,
                },
            },
            content: true,
            createdAt: true,
            updatedAt: true,
            parentId: true,
            postId: true,
            children: {
                select: {
                    id: true,
                },
            },
        },
    })

    return Response.json(replies)
}
