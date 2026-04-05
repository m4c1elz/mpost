import { NextAuthConfig } from 'next-auth'
import { getLocale } from 'next-intl/server'
import { NextResponse } from 'next/server'

type AuthorizedCallback = NonNullable<NextAuthConfig['callbacks']>['authorized']

const PRIVATE = ['/posts', '/settings', '/users', '/updates', '/api']
const PUBLIC = ['/login', '/signin', '/verify', '/forgotpassword']

export const authorized: AuthorizedCallback = async ({ auth, request }) => {
    const { pathname } = request.nextUrl
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
        console.log(new URL(`/${locale}`, request.url).toString())
        return NextResponse.redirect(new URL(`/${locale}`, request.url))
    }

    if (!isAuthenticated && isPrivateRoute) {
        return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
    }
}
