'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ComponentProps, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type PasswordInputProps = ComponentProps<'input'>

export function PasswordInput(props: PasswordInputProps) {
    const [isShowingPassword, setIsShowingPassword] = useState(false)

    return (
        <div className="flex gap-1">
            <Input {...props} type={isShowingPassword ? 'text' : 'password'} />
            <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => setIsShowingPassword(!isShowingPassword)}
            >
                {isShowingPassword ? <Eye /> : <EyeOff />}
            </Button>
        </div>
    )
}
