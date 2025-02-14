import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { prisma } from './lib/prisma'
import { compare } from 'bcrypt-ts'
import { env } from '@/env'

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

                const user = await prisma.user.findUnique({
                    where: {
                        email: result.data.email,
                    },
                })

                if (!user || !user.isVerified) {
                    return null
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
        jwt({ token, user, trigger, session }) {
            if (trigger === 'update' && session?.name && session?.name) {
                token.atsign = session.atsign
                token.name = session.name
            }

            if (user && user.atsign && user.id) {
                token.atsign = user.atsign
                token.id = user.id
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
                },
            }
        },
    },
})
