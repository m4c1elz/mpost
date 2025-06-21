import 'server-only'
import { prisma } from '@/lib/prisma'

export async function getUserByAtsign(atsign: string) {
    const user = await prisma.user.findUnique({
        where: {
            atsign,
        },
    })

    return user
}
