import { redirect } from '@/i18n/navigation'
import { getLocale } from 'next-intl/server'

export default async function Settings() {
    const locale = await getLocale()
    return redirect({ href: '/settings/user', locale })
}
