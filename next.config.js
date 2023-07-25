/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  images: {
    minimumCacheTTL: 60,
  },
  optimization: {
    minimize: true,
  },
  env: {
    NEXT_PUBLIC_ENV: 'PRODUCTION', //your next configs goes here
  }
}


module.exports = withBundleAnalyzer(nextConfig)
