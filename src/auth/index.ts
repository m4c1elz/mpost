import NextAuth from 'next-auth'
import { env } from '@/env'
import { credentialsProvider } from './providers'

import { session } from './callbacks/session'
import { jwt } from './callbacks/jwt'
import { authorized } from './callbacks/authorized'

export const { auth, signOut, signIn, handlers } = NextAuth({
    secret: env.AUTH_SECRET,
    providers: [credentialsProvider],
    callbacks: {
        authorized,
        jwt,
        session,
    },
})
