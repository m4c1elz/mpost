import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card'
import { CreatePostForm } from '../../_components/create-post-form'

export default function CreatePost() {
    return (
        <Card className="w-full md:w-[450px] m-auto">
            <CardHeader>
                <CardTitle>Criar postagem</CardTitle>
                <CardDescription>Fale um pouco do seu dia!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <CreatePostForm />
            </CardContent>
        </Card>
    )
}
