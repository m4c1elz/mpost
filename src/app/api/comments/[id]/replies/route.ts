import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { NextRequest } from 'next/server'

type Params = Promise<{ id: string }>

export async function GET(
    request: NextRequest,
    { params }: { params: Params }
) {
    const { id } = await params
    const page = request.nextUrl.searchParams.get('page')

    if (isNaN(Number(id))) {
        return notFound()
    }

    const parsedPage = Number(page ?? 1)
    const limit = 8

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
                    image: true,
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
        orderBy: {
            createdAt: 'desc',
        },
        take: limit,
        skip: (parsedPage - 1) * limit,
    })

    const replyCount = await prisma.comment.count({
        where: {
            parentId: Number(id),
        },
    })

    const totalPages = Math.ceil(replyCount / limit)

    return Response.json({
        data: replies,
        pagination: {
            page: parsedPage,
            limit,
            totalPages,
            totalItems: replyCount,
        },
    })
}
