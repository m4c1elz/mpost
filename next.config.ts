import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'

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

const withIntl = createNextIntlPlugin()

export default withIntl(withMdx(nextConfig))
