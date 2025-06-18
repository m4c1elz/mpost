'use client'

import { TZDate } from '@date-fns/tz'
import { formatRelativeDate } from '@/helpers/format-relative-date'

interface DateTimeProps {
    createdAt: Date
    updatedAt: Date | null
}

export function DateTime({ createdAt, updatedAt }: DateTimeProps) {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const zonedCreatedAt = new TZDate(createdAt, userTimezone)
    const zonedUpdatedAt = updatedAt && new TZDate(updatedAt, userTimezone)

    const formattedCreatedAt = formatRelativeDate(createdAt)

    return (
        <p className="text-foreground/50 hidden sm:block">
            {formattedCreatedAt}{' '}
            {zonedUpdatedAt?.getTime() !== zonedCreatedAt.getTime() &&
                '(editado)'}
        </p>
    )
}
