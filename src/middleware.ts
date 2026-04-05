import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import { defaultLocale, locales } from './i18n/locales'
import { auth } from '@/auth'

const handle18nRouting = createMiddleware({
    locales,
    defaultLocale,
    localeDetection: true,
})

export const middleware = auth(req => {
    // do NOT localize api routes
    if (req.nextUrl.pathname.includes('api')) {
        return NextResponse.next()
    }

    return handle18nRouting(req)
})

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api/auth|assets|sitemap.xml|robots.txt).*)',
    ],
}
