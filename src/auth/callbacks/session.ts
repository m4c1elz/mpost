import { NextAuthConfig } from 'next-auth'

type SessionCallback = NonNullable<NextAuthConfig['callbacks']>['session']

export const session: SessionCallback = async ({ session, token }) => ({
    ...session,
    user: {
        ...session.user,
        atsign: token.atsign,
        id: token.id as string,
        image: token.picture as string,
        status: token.status as string,
        url: token.url as string,
    },
})
