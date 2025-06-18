import { prisma } from '@/lib/prisma'

export async function editUser(
    userId: string,
    data: { name: string; atsign: string }
) {
    const result = await prisma.user.update({
        where: {
            id: userId,
        },
        data,
        select: {
            name: true,
            atsign: true,
        },
    })
}
