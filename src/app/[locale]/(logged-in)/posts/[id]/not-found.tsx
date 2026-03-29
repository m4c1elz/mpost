import Link from 'next/link'
import { MapPinX } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PostNotFound() {
    return (
        <main className="text-center h-96 grid place-content-center space-y-4">
            <MapPinX className="text-destructive mx-auto mb-2" size={50} />
            <div>
                <h1 className="text-xl font-bold">Que esquisito.</h1>
                <p className="font-medium">
                    Parece que essa postagem não existe.
                </p>
            </div>
            <Button variant="link" asChild>
                <Link href="/">Voltar para a página principal</Link>
            </Button>
        </main>
    )
}
