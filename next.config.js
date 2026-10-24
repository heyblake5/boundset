/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { inlineCss: true },
  async redirects() {
    return [
      { source: '/quiz', destination: '/free-tools', permanent: true },
      { source: '/quiz/:path*', destination: '/free-tools', permanent: true },
      { source: '/tools/positioning-statement-generator', destination: '/free-tools/positioning-statement-generator', permanent: true },
      { source: '/workshop/thanks', destination: 'https://cal.com/heyblake/positioning-workshop', permanent: false },
    ]
  },
}
module.exports = nextConfig
