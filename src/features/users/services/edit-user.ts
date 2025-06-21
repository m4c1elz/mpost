import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

type EditableUserProps = Partial<Pick<User, 'atsign' | 'name' | 'password'>>

export async function editUser(userId: string, data: EditableUserProps) {
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

    return result
}
