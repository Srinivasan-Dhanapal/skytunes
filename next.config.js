/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*-ssl.mzstatic.com',
      },
    ],
  },
}

module.exports = nextConfig
