import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
    transpilePackages: ['prettier'],
    pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
    turbopack: {
        root: '.',
    },
}

const withMdx = createMDX({
    extension: /\.(md|mdx)$/,
})

export default withMdx(nextConfig)
