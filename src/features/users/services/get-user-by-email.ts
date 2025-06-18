import 'server-only'
import { prisma } from '@/lib/prisma'

export async function getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    return user
}
