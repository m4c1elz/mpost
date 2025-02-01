import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
    CardTitle,
    CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
                    <div className="space-y-2">
                        <Label>Nome</Label>
                        <Input
                            type="text"
                            placeholder="Fulano Beltrano"
                            defaultValue={session?.user.name ?? ''}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Apelido</Label>
                        <Input
                            type="text"
                            placeholder="Fulano Beltrano"
                            defaultValue={session?.user.atsign ?? ''}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Enviar</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
