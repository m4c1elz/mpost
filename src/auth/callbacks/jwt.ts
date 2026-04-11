import { getUserByEmail } from '@/features/users/services/get-user-by-email'
import { NextAuthConfig } from 'next-auth'

type JwtCallback = NonNullable<NextAuthConfig['callbacks']>['jwt']

export const jwt: JwtCallback = async ({ token, user, trigger }) => {
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
}
