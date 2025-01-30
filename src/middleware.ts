import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'

const PRIVATE = ['/', '/posts/create']
const PUBLIC = ['/login', '/signin']

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const session = await auth()

    const isPrivateRoute = PRIVATE.includes(pathname)
    const isPublicRoute = PUBLIC.includes(pathname)

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
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}
