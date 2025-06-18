import { notFound } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/helpers/get-initials'
import { CalendarDays, Mail } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { PostList } from '@/features/posts/components/post-list'
import { getUserByAtsign } from '@/features/users/services/get-user-by-atsign'

type UserProps = {
    params: Promise<{ user: string }>
}

export default async function User({ params }: UserProps) {
    const { user: atsign } = await params

    const user = await getUserByAtsign(atsign)

    if (!user) {
        return notFound()
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center gap-4 h-auto md:flex-row">
                <Avatar className="size-36">
                    <AvatarFallback className="text-3xl font-bold">
                        {getInitials(user.name)}
                    </AvatarFallback>
                    <AvatarImage src={user.image ?? ''} alt={user.name} />
                </Avatar>
                <div className="flex h-auto flex-col gap-4 md:gap-4 md:justify-around">
                    <div className="flex gap-2 items-end">
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <h2 className="text-lg font-medium text-foreground/50">
                            @{user.atsign}
                        </h2>
                    </div>
                    <div className="space-y-2">
                        <div className="flex gap-2 items-center">
                            <Mail /> {user.email}
                        </div>
                        <div className="flex gap-2 items-center">
                            <CalendarDays />{' '}
                            <span>
                                Entrou em{' '}
                                {format(user.createdAt, "MMMM 'de' yyyy", {
                                    locale: ptBR,
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-6">
                <p className="text-xl font-bold">Postagens</p>
                <PostList posts={user.posts} />
            </div>
        </div>
    )
}
