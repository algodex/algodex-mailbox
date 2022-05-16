const withPWA = require('next-pwa')
const { i18n } = require('./next-i18next.config')
/** @type {import('next').NextConfig} */

const moduleExports = withPWA({
  // compiler: {
  //   // ssr and displayName are configured by default
  //   styledComponents: true,
  i18n,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  compiler: {
    styledComponents: true,
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/algod/:path*',
          destination: 'https://indexer.algoexplorerapi.io/rl/v1/search/:path*',
        },
      ],
    }
  },
})

module.exports = moduleExports
