/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ielts.api.babyyodas.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      }
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: process.env.VERCEL_ENV === "production"
  },
  eslint: {
    ignoreDuringBuilds: process.env.VERCEL_ENV === "production"
  },
  env: {
    NEXT_PUBLIC_ENV: 'PRODUCTION',
  }
}


module.exports = withBundleAnalyzer(nextConfig)
