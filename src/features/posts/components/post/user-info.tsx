import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

interface UserInfoProps {
    username: string
    atsign: string
    imageUrl: string | null
    imageFallback: string
}

export function UserInfo({
    username,
    atsign,
    imageFallback,
    imageUrl,
}: UserInfoProps) {
    return (
        <div className="flex gap-2 items-center">
            <Avatar className="size-8">
                <AvatarFallback className="text-sm">
                    {imageFallback}
                </AvatarFallback>
                <AvatarImage src={imageUrl ?? undefined} alt={username} />
            </Avatar>
            <Link
                href={`/users/${atsign}`}
                className="font-bold hover:underline"
            >
                {username}
            </Link>
            <span className="text-foreground/50">@{atsign}</span>
        </div>
    )
}
