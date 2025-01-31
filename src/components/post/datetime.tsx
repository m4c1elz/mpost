'use client'

import { formatRelative } from 'date-fns'
import { TZDate } from '@date-fns/tz'
import { ptBR } from 'date-fns/locale/pt-BR'

interface DateTimeProps {
    createdAt: Date
    updatedAt: Date
}

export function DateTime({ createdAt, updatedAt }: DateTimeProps) {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const zonedDate = new TZDate(createdAt, userTimezone)
    const zonedTodayDate = new TZDate(new Date(), userTimezone)

    return (
        <p className="text-foreground/50 hidden sm:block">
            {formatRelative(zonedDate, zonedTodayDate, {
                locale: ptBR,
            })}{' '}
            {updatedAt.getTime() !== createdAt.getTime() && '(editado)'}
        </p>
    )
}
