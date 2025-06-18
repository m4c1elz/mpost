import 'server-only'
import { User } from '@prisma/client'
import { hash } from 'bcrypt-ts'
import { prisma } from '@/lib/prisma'

type CreateUserDTO = Pick<User, 'atsign' | 'email' | 'name' | 'password'>

export async function createUser(data: CreateUserDTO) {
    const hashedPassword = await hash(data.password, 10)

    const newUser = await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            atsign: data.atsign,
            password: hashedPassword,
        },
    })

    return newUser
}
