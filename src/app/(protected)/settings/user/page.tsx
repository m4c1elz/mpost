import { auth } from '@/auth'
import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
    CardTitle,
} from '@/components/ui/card'
import { EditUserForm } from './edit-user-form'

export default async function UserSettings() {
    const session = await auth()

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold">Usuário</h3>
            <Card className="min-w-[450px]">
                <CardHeader>
                    <CardTitle>Informações</CardTitle>
                    <CardDescription>
                        Altere seu usuário do MPost.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <EditUserForm
                        defaultAtsign={session?.user.atsign ?? ''}
                        defaultName={session?.user.name ?? ''}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
