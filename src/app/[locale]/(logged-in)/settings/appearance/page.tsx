import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card'
import { ThemeButtons } from '@/features/settings/components/theme-buttons'
import { getTranslations } from 'next-intl/server'

export default async function AppearanceSettings() {
    const t = await getTranslations('settings.options.appearance')

    return (
        <div className="space-y-4 w-full">
            <h2 className="text-xl font-bold">{t('title')}</h2>
            <Card className="h-min w-full md:w-[450px]">
                <CardHeader>
                    <CardTitle>{t('form.title')}</CardTitle>
                    <CardDescription>{t('form.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ThemeButtons />
                </CardContent>
            </Card>
        </div>
    )
}
