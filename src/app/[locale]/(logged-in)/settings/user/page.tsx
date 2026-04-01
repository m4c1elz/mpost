import { auth } from '@/auth'
import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
    CardTitle,
} from '@/components/ui/card'
import { EditUserForm } from '@/features/users/components/edit-user-form'
import { ProfilePictureForm } from '@/features/users/components/profile-picture-form'
import { getTranslations } from 'next-intl/server'

export default async function UserSettings() {
    const session = await auth()
    const t = await getTranslations('settings.options.user')

    return (
        <div className="space-y-4 w-full">
            <h3 className="text-xl font-bold">{t('title')}</h3>
            <Card className="w-full md:w-[450px]">
                <CardHeader>
                    <CardTitle>{t('info.title')}</CardTitle>
                    <CardDescription>{t('info.description')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <EditUserForm
                        defaultAtsign={session?.user.atsign ?? ''}
                        defaultName={session?.user.name ?? ''}
                        defaultStatus={session?.user.status ?? ''}
                        defaultUrl={session?.user.url ?? ''}
                    />
                </CardContent>
            </Card>
            <Card className="w-full md:w-[450px]">
                <CardHeader>
                    <CardTitle>{t('profilePic.title')}</CardTitle>
                    <CardDescription>
                        {t('profilePic.description')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ProfilePictureForm />
                </CardContent>
            </Card>
        </div>
    )
}
