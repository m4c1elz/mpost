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

    const zonedCreatedAt = new TZDate(createdAt, userTimezone)
    const zonedUpdatedAt = new TZDate(updatedAt, userTimezone)
    const zonedTodayDate = new TZDate(new Date(), userTimezone)

    return (
        <p className="text-foreground/50 hidden sm:block">
            {formatRelative(zonedCreatedAt, zonedTodayDate, {
                locale: ptBR,
            })}{' '}
            {zonedUpdatedAt.getTime() !== zonedCreatedAt.getTime() &&
                '(editado)'}
        </p>
    )
}
