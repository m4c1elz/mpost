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

export default async function UserSettings() {
    const session = await auth()

    return (
        <div className="space-y-4 w-full">
            <h3 className="text-xl font-bold">Usuário</h3>
            <Card className="w-full md:w-[450px]">
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
            <Card className="w-full md:w-[450px]">
                <CardHeader>
                    <CardTitle>Foto de perfil</CardTitle>
                    <CardDescription>
                        Altere sua foto de perfil. (Tamanho máx. de 500KB)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ProfilePictureForm />
                </CardContent>
            </Card>
        </div>
    )
}
