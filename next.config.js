const withPWA = require('next-pwa')
const { i18n } = require('./next-i18next.config')
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/send-assets',
        permanent: true
      }
    ]
  }
}

module.exports = withPWA(nextConfig)
