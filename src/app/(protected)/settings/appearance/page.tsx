import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card'
import { ThemeButtons } from './theme-buttons'

export default function AppearanceSettings() {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Aparência</h2>
            <Card className="h-min">
                <CardHeader>
                    <CardTitle>Tema</CardTitle>
                    <CardDescription>
                        Escolha um tema que seja agradável aos seus olhos.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ThemeButtons />
                </CardContent>
            </Card>
        </div>
    )
}
