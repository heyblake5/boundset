/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { inlineCss: true },
  async redirects() {
    return [
      // Case studies hidden until fleshed out (Blake, Oct 24). Source kept in app/case-studies.
      { source: '/case-studies', destination: '/', permanent: true },
      { source: '/case-studies/:path*', destination: '/', permanent: true },
      { source: '/design/c2', destination: '/', permanent: true },
      { source: '/quiz', destination: '/free-tools', permanent: true },
      { source: '/quiz/:path*', destination: '/free-tools', permanent: true },
      { source: '/tools/positioning-statement-generator', destination: '/free-tools/positioning-statement-generator', permanent: true },
      { source: '/workshop/thanks', destination: 'https://cal.com/heyblake/positioning-workshop', permanent: false },
    ]
  },
}
module.exports = nextConfig
