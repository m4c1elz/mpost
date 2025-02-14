'use server'

import VerifyEmail from '@/emails/verify-email'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt-ts'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { render } from '@react-email/components'
import { env } from '@/env'

const registerSchema = z.object({
    email: z.string().email('E-mail inválido.').trim(),
    password: z
        .string()
        .min(8, 'Senha deve conter no mínimo 8 caracteres.')
        .trim(),
    name: z.string().min(3, 'Nome deve conter no mínimo 3 caracteres.').trim(),
    atsign: z
        .string()
        .min(3, 'Apelido deve conter ao menos 3 caracteres.')
        .max(12, 'Apelido não pode conter mais de 12 caracteres.')
        .trim(),
})

type Response =
    | {
          success: boolean
          error: z.inferFlattenedErrors<typeof registerSchema>['fieldErrors']
      }
    | undefined

export async function register(
    _prevState: any,
    formData: FormData
): Promise<Response> {
    const email = formData.get('email')
    const password = formData.get('password')
    const name = formData.get('name')
    const atsign = formData.get('atsign')

    const parsed = registerSchema.safeParse({ email, password, name, atsign })

    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.flatten().fieldErrors,
        }
    }

    const data = parsed.data

    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    })

    if (user) {
        const atsignExists = user.atsign == atsign

        return {
            error: {
                email: ['E-mail inválido.'],
                ...(atsignExists && {
                    atsign: ['Apelido inválido.'],
                }),
            },
            success: false,
        }
    }

    const newUser = await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            atsign: data.atsign,
            password: await hash(data.password, 10),
        },
    })

    try {
        if (env.VERCEL_ENV === 'development' || env.NODE_ENV == 'development') {
            console.log('---DEV MODE---')
            console.log('Skipping email verification')
            await prisma.user.update({
                data: {
                    isVerified: true,
                },
                where: {
                    id: newUser.id,
                },
            })
            return { success: true, error: {} }
        }

        const redirectJwt = jwt.sign(
            { id: newUser?.id },
            env.EMAIL_JWT_SECRET,
            {
                expiresIn: '24h',
            }
        )

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: env.EMAIL_SENDER_ADDRESS,
                pass: env.EMAIL_SENDER_PASSWORD,
            },
        })

        const info = await transport.sendMail({
            from: env.EMAIL_SENDER_ADDRESS,
            to: data.email,
            subject: 'Confirmação de E-mail',
            html: await render(
                VerifyEmail({
                    redirectUrl: new URL(
                        `/verify/${redirectJwt}`,
                        env.EMAIL_REDIRECT_URL
                    ).toString(),
                })
            ),
        })

        console.log(info)

        return { success: true, error: {} }
    } catch (error) {
        console.log(error)
        return {
            error: { email: ['Erro crítico ao enviar email de confirmação.'] },
            success: false,
        }
    }
}
