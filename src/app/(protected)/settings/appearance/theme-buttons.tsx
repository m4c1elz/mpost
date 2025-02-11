'use client'
import { useTheme } from 'next-themes'

export function ThemeButtons() {
    const { setTheme } = useTheme()

    return (
        <div className="flex gap-4 items-center">
            <div className="flex flex-col items-center gap-2">
                <button
                    className="cursor-pointer aspect-square bg-[hsl(0,0%,100%)] size-36 md:size-40 rounded border border-foreground flex flex-col justify-center items-start gap-4 px-4 py-2"
                    onClick={() => setTheme('light')}
                >
                    <div className="bg-[hsl(240,10%,3.9%)]/50 size-8 aspect-square rounded-full" />
                    <div className="bg-[hsl(240,10%,3.9%)]/50 h-2 rounded-full w-1/3" />
                    <div className="bg-[hsl(240,10%,3.9%)]/50 h-2 rounded-full w-full" />
                    <div className="bg-[hsl(240,10%,3.9%)]/50 h-2 rounded-full w-full" />
                </button>
                <p>Tema Claro</p>
            </div>
            <div className="flex flex-col items-center gap-2">
                <button
                    className="cursor-pointer aspect-square bg-[hsl(240,10%,3.9%)] size-36 md:size-40 rounded border border-foreground flex flex-col justify-center items-start gap-4 px-4 py-2"
                    onClick={() => setTheme('dark')}
                >
                    <div className="bg-[hsl(0,0%,99%)]/50 size-8 aspect-square rounded-full" />
                    <div className="bg-[hsl(0,0%,99%)]/50 h-2 rounded-full w-1/3" />
                    <div className="bg-[hsl(0,0%,99%)]/50 h-2 rounded-full w-full" />
                    <div className="bg-[hsl(0,0%,99%)]/50 h-2 rounded-full w-full" />
                </button>
                <p>Tema Escuro</p>
            </div>
        </div>
    )
}
