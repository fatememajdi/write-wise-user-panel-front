/** @type {import('next').NextConfig} */
// const { BLOG_URL, STUDIO_URL } = process.env

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: `/:path*`,
  //     },
  //     {
  //       source: '/blogs',
  //       destination: `${BLOG_URL}/blogs`,
  //     },
  //     {
  //       source: '/blogs/:path*',
  //       destination: `${BLOG_URL}/blogs/:path*`,
  //     },
  //     {
  //       source: '/editor',
  //       destination: `${STUDIO_URL}/editor`,
  //     },
  //     {
  //       source: '/editor/:path*',
  //       destination: `${STUDIO_URL}/editor/:path*`,
  //     },
  //   ]
  // },
  rewrites: async () => [
    { source: '/privacyPolicy', destination: '/wwai.ai Privacy Policy.pdf' },
    { source: '/cookies', destination: '/cookie.html' },
    { source: '/termsOfService', destination: '/wwai.ai-Terms and Conditions of Use.pdf' },
    { source: '/disclaimers', destination: '/wwai.ai-Disclaimers.pdf' },
  ],
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.wwai.ai',
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
  },
}


module.exports = withBundleAnalyzer(nextConfig)
