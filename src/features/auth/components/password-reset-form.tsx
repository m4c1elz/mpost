'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SendEmailButton } from './send-email-button'
import { useState } from 'react'
import { sendResetPasswordEmail } from '../actions/send-reset-password.email'

export function PasswordResetForm() {
    const [email, setEmail] = useState('')

    return (
        <form className="space-y-4">
            <Label htmlFor="email">E-mail</Label>
            <Input
                type="email"
                name="email"
                placeholder="fulanodetal@gmail.com"
                onChange={e => setEmail(e.target.value)}
            />
            <SendEmailButton
                sendEmailAction={() => sendResetPasswordEmail(email)}
            />
        </form>
    )
}
