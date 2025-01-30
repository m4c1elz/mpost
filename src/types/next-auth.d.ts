import { DefaultSession, User as DefaultUser } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
    interface Session {
        user: {
            atsign?: string | null
        } & DefaultSession['user']
    }

    interface User extends DefaultUser {
        atsign?: string | null
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        id?: string | null
        atsign?: string | null
    }
}

declare module '@auth/core/adapters' {
    interface AdapterUser {
        atsign?: string | null
    }
}
