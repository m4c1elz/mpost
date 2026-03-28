import { Button } from '@/components/ui/button'
import { Pin } from 'lucide-react'

type PinPostButtonProps = {
    id: number
}

export function PinPostButton({ id }: PinPostButtonProps) {
    return (
        <Button size="icon" variant="ghost">
            <Pin />
        </Button>
    )
}
