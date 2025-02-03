import { Moon } from 'lucide-react'
import { Switch } from './ui/switch'
import { useTheme } from 'next-themes'

export function ThemeSwitch() {
    const { setTheme, resolvedTheme } = useTheme()

    return (
        <div className="flex gap-2 w-min">
            <Switch
                checked={resolvedTheme === 'dark'}
                onCheckedChange={() => {
                    setTheme(resolvedTheme == 'dark' ? 'light' : 'dark')
                }}
            />
            <Moon />
        </div>
    )
}
