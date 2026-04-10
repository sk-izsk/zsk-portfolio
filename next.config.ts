import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import type { NextConfig } from 'next'

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'izsk.netlify.app',
      },
    ],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default withVanillaExtract(nextConfig)
