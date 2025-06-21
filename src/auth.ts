import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { compare } from 'bcrypt-ts'
import { env } from '@/env'
import { getUserByEmail } from './features/users/services/get-user-by-email'

export const { auth, signOut, signIn, handlers } = NextAuth({
    secret: env.AUTH_SECRET,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async credentials => {
                const authSchema = z.object({
                    email: z.string().email(),
                    password: z.string(),
                })

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

                const isPassCorrect = await compare(
                    result.data.password,
                    user.password
                )

                if (!isPassCorrect) {
                    return null
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    atsign: user.atsign,
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger }) {
            if (user) {
                token.atsign = user.atsign
                token.id = user.id
                token.email = user.email
                token.picture = user.image
            }

            if (trigger === 'update' && token.email) {
                const dbUser = await getUserByEmail(token.email)

                if (dbUser) {
                    token.atsign = dbUser.atsign
                    token.name = dbUser.name
                    token.picture = dbUser.image
                }
            }

            return token
        },
        session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    atsign: token.atsign,
                    id: token.id as string,
                    image: token.picture as string,
                },
            }
        },
    },
})
