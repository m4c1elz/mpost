import 'server-only'
import { prisma } from '@/lib/prisma'

export async function getUserByAtsign(atsign: string) {
    const user = await prisma.user.findUnique({
        where: {
            atsign,
        },
        select: {
            name: true,
            atsign: true,
            image: true,
            email: true,
            createdAt: true,
            posts: {
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            atsign: true,
                            name: true,
                            image: true,
                        },
                    },
                },
            },
        },
    })

    return user
}
