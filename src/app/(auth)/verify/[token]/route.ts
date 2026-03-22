import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { env } from '@/env'
import { jwtVerify } from 'jose'

interface Params {
    params: Promise<{ token: string; email: string }>
}

type EmailPayload = {
    email: string
}

export async function GET(req: Request, { params }: Params) {
    const { token, email } = await params

    try {
        const { payload } = await jwtVerify<EmailPayload>(
            token,
            new TextEncoder().encode(env.EMAIL_JWT_SECRET),
        )
        await prisma.user.update({
            data: {
                isVerified: true,
            },
            where: { email: payload.email, isVerified: false },
        })

        return NextResponse.redirect(new URL('/verify/success', req.url))
    } catch (error) {
        if (error instanceof Error) {
            console.log({
                error: error.message,
                stack: error.stack,
            })
            return NextResponse.redirect(
                new URL(
                    '/verify/failed?token=' + token + '&email=' + email,
                    req.url,
                ),
            )
        }
    }
}
