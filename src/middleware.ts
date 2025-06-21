import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'

const PRIVATE = [
    '/',
    '/posts',
    '/settings',
    '/users',
    '/api/comments',
    '/api/notifications',
]
const PUBLIC = ['/login', '/signin', '/verify', '/forgotpassword']

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const session = await auth()

    const isPrivateRoute =
        PRIVATE.includes(pathname) ||
        PRIVATE.some(route => pathname.startsWith(`${route}/`))
    const isPublicRoute =
        PUBLIC.includes(pathname) ||
        PUBLIC.some(route => pathname.startsWith(`${route}/`))

    if (session && isPublicRoute) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (!session && isPrivateRoute) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}
