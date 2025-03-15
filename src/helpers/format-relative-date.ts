import { TZDate } from '@date-fns/tz'
import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

export function formatRelativeDate(date: Date) {
    // prevent timezone mistakes by formatting based on user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const zonedDate = new TZDate(date, userTimezone)
    const today = new TZDate(new Date(), userTimezone)

    return formatRelative(zonedDate, today, {
        locale: ptBR,
    })
}
