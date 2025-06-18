import Link from 'next/link'

interface UserInfoProps {
    username: string
    atsign: string
}

export function UserInfo({ username, atsign }: UserInfoProps) {
    return (
        <div className="flex gap-2 items-center">
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
