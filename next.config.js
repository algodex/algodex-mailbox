const withPWA = require('next-pwa')
const { i18n } = require('./next-i18next.config')
/** @type {import('next').NextConfig} */

const indexerServer = process.env.NEXT_PUBLIC_CUSTOM_INDEXER_SERVER
const indexerPort = process.env.NEXT_PUBLIC_CUSTOM_INDEXER_PORT

const nextConfig = {
  // compiler: {
  //   // ssr and displayName are configured by default
  //   styledComponents: true,
  // },
  reactStrictMode: true,
  i18n,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development'
  },
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/indexer/:slug*',
        destination: `${indexerServer}:${indexerPort}/:slug*`,
      },
    ]
  },
}

module.exports = withPWA(nextConfig)
