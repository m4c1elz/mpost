import 'server-only'
import { User } from '@prisma/client'
import { hash } from 'bcrypt-ts'
import { prisma } from '@/lib/prisma'
import { env } from 'process'

type CreateUserDTO = Pick<User, 'atsign' | 'email' | 'name' | 'password'>

export async function createUser(data: CreateUserDTO) {
    const hashedPassword = await hash(data.password, 10)

    // if in dev mode - automatically verify
    const inDevMode = env.NODE_ENV === 'development'

    if (inDevMode) console.log('[DEV MODE] - SKIPPING VERIFICATION')

    const newUser = await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            atsign: data.atsign,
            password: hashedPassword,
            isVerified: inDevMode,
        },
    })

    return newUser
}
