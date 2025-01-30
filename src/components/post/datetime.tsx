import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

interface DateTimeProps {
    createdAt: Date
    updatedAt: Date
}

export function DateTime({ createdAt, updatedAt }: DateTimeProps) {
    return (
        <p className="text-foreground/50 hidden sm:block">
            {formatRelative(createdAt, new Date(), {
                locale: ptBR,
            })}{' '}
            {updatedAt.getTime() !== createdAt.getTime() && '(editado)'}
        </p>
    )
}
