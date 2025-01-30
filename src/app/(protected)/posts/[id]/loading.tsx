import { Loader2 } from 'lucide-react'

export default function PostLoading() {
    return (
        <div className="h-96 grid place-content-center">
            <Loader2 className="animate-spin" size={60} />
        </div>
    )
}
