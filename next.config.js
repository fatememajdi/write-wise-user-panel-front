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
        // pathname: '/account123/**',
      },
    ],
  },
  // optimization: {
  //   minimize: true,
  // },
  env: {
    NEXT_PUBLIC_ENV: 'PRODUCTION',
  }
}


module.exports = withBundleAnalyzer(nextConfig)
