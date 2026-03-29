import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    transpilePackages: ['prettier'],
    pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
}

const withMdx = createMDX({
    extension: /\.(md|mdx)$/,
})

export default withMdx(nextConfig)
