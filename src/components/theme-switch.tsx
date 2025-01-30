import { Moon } from 'lucide-react'
import { Switch } from './ui/switch'
import { useTheme } from 'next-themes'

export function ThemeSwitch() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="flex gap-2 w-min">
            <Switch
                checked={theme === 'dark'}
                onCheckedChange={() => {
                    setTheme(theme == 'dark' ? 'light' : 'dark')
                }}
            />{' '}
            <Moon />
        </div>
    )
}
