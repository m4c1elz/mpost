'use client'

import { CalendarDays } from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'

type UserJoinDateProps = {
    date: Date
}

export function UserJoinDate({ date }: UserJoinDateProps) {
    const formatter = useFormatter()
    const t = useTranslations('profile')

    return (
        <div className="flex gap-2 items-center">
            <CalendarDays />{' '}
            <span>
                {t('joinedIn', {
                    date: formatter.dateTime(date, {
                        month: 'long',
                        year: 'numeric',
                    }),
                })}
            </span>
        </div>
    )
}
