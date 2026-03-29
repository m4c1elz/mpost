'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export function FooterMacielImage() {
    const { resolvedTheme } = useTheme()
    const [imagePath, setImagePath] = useState<string | undefined>(undefined)

    useEffect(() => {
        const imageUrl =
            resolvedTheme === 'dark'
                ? '/assets/ciel-dark.png'
                : '/assets/ciel-light.png'

        setImagePath(imageUrl)
    }, [resolvedTheme])

    return (
        <img
            src={imagePath}
            alt="Ciel"
            style={{ height: '80px' }}
            className="opacity-50 hover:opacity-100 transition"
            suppressHydrationWarning
        />
    )
}
