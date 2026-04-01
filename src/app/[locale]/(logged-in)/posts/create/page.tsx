import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card'
import { CreatePostForm } from '@/features/posts/components/create-post-form'
import { getTranslations } from 'next-intl/server'

export default async function CreatePost() {
    const t = await getTranslations('posts.create')

    return (
        <Card className="w-full md:w-[450px] m-auto">
            <CardHeader>
                <CardTitle>{t('title')}</CardTitle>
                <CardDescription>{t('description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <CreatePostForm />
            </CardContent>
        </Card>
    )
}
