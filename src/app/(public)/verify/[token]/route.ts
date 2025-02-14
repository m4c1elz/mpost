import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { env } from '@/env'

interface Params {
    params: Promise<{ token: string }>
}

type EmailPayload = {
    id: string
}

export async function GET(req: Request, { params }: Params) {
    const { token } = await params

    try {
        const payload = jwt.verify(token, env.EMAIL_JWT_SECRET) as EmailPayload
        await prisma.user.update({
            data: {
                isVerified: true,
            },
            where: { id: payload.id, isVerified: false },
        })

        return NextResponse.redirect(new URL('/verify/success', req.url))
    } catch (error) {
        if (error instanceof Error) {
            console.log({
                error: error.message,
                stack: error.stack,
            })
            return NextResponse.json({ error: error.message })
        }
    }
}
