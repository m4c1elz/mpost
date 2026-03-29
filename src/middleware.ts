import { auth } from '@/auth'
import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { i18nRouting } from './i18n/routing'

const PRIVATE = ['/', '/posts', '/settings', '/users', '/updates']
const PUBLIC = ['/login', '/signin', '/verify', '/forgotpassword']

const handle18nRouting = createMiddleware(i18nRouting)

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const session = await auth()

    const isPrivateRoute =
        PRIVATE.includes(pathname) ||
        PRIVATE.some(route => pathname.startsWith(`${route}/`))
    const isPublicRoute =
        PUBLIC.includes(pathname) ||
        PUBLIC.some(route => pathname.startsWith(`${route}/`))
    const isApiRoute = pathname.startsWith('/api')

    if (session && isPublicRoute) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (!session && isPrivateRoute) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (isApiRoute) {
        return NextResponse.next()
    }

    return handle18nRouting(req)
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}
