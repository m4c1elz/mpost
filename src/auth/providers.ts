import { z } from 'zod'
import { getUserByEmail } from '@/features/users/services/get-user-by-email'
import { compare } from 'bcrypt-ts'
import Credentials from 'next-auth/providers/credentials'

const authSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const credentialsProvider = Credentials({
    credentials: {
        email: {},
        password: {},
    },
    authorize: async credentials => {
        const result = authSchema.safeParse(credentials)

        if (!result.success) {
            return null
        }

        const user = await getUserByEmail(result.data.email)

        if (!user) {
            return null
        }

        if (!user.isVerified) {
            throw new Error('EMAIL_NOT_VERIFIED')
        }

        const isPassCorrect = await compare(result.data.password, user.password)

        if (!isPassCorrect) {
            return null
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            atsign: user.atsign,
            status: user.status,
            url: user.url,
        }
    },
})
