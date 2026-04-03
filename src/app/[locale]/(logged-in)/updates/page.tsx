import { Link } from '@/i18n/navigation'
import { versions } from './versions'
import { getTranslations } from 'next-intl/server'

export default async function UpdatesPage() {
    const t = await getTranslations('updates')

    return (
        <>
            <h2>{t('allUpdates')}</h2>
            <ul>
                {versions.map(update => (
                    <li key={update.version}>
                        <Link href={update.href}>{update.version}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}
