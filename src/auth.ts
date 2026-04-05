import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { compare } from 'bcrypt-ts'
import { env } from '@/env'
import { getUserByEmail } from './features/users/services/get-user-by-email'
import { NextResponse } from 'next/server'
import { getLocale } from 'next-intl/server'

const PRIVATE = ['/posts', '/settings', '/users', '/updates', '/api']
const PUBLIC = ['/login', '/signin', '/verify', '/forgotpassword']

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
                    user.password,
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
                    status: user.status,
                    url: user.url,
                }
            },
        }),
    ],
    callbacks: {
        async authorized({ auth, request: req }) {
            console.log('reached auth middleware')
            const { pathname } = req.nextUrl
            const locale = await getLocale()

            // remove locale from url
            const normalizePathname = (pathname: string) =>
                pathname.replace(/^\/(en|pt-br)(\/|$)/, '/') || '/'

            const normalizedPathname = normalizePathname(pathname)

            const isAuthenticated = !!auth

            const isPublicRoute = PUBLIC.some(route =>
                normalizedPathname.startsWith(route),
            )

            const isPrivateRoute =
                PRIVATE.some(route => normalizedPathname.startsWith(route)) ||
                normalizedPathname === '/'

            if (isAuthenticated && isPublicRoute) {
                console.log(new URL(`/${locale}`, req.url).toString())
                return NextResponse.redirect(new URL(`/${locale}`, req.url))
            }

            if (!isAuthenticated && isPrivateRoute) {
                return NextResponse.redirect(
                    new URL(`/${locale}/login`, req.url),
                )
            }
        },
        async jwt({ token, user, trigger }) {
            if (user) {
                token.atsign = user.atsign
                token.id = user.id
                token.email = user.email
                token.picture = user.image
                token.status = user.status
                token.url = user.url
            }

            if (trigger === 'update' && token.email) {
                const dbUser = await getUserByEmail(token.email)

                if (dbUser) {
                    token.atsign = dbUser.atsign
                    token.name = dbUser.name
                    token.picture = dbUser.image
                    token.status = dbUser.status
                    token.url = dbUser.url
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
                    status: token.status as string,
                    url: token.url as string,
                },
            }
        },
    },
})
