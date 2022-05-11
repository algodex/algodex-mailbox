const withPWA = require('next-pwa')
const { i18n } = require('./next-i18next.config')
/** @type {import('next').NextConfig} */

const moduleExports = withPWA({
  // compiler: {
  //   // ssr and displayName are configured by default
  //   styledComponents: true,
  // },
  reactStrictMode: true,
  i18n,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  compiler: {
    styledComponents: true,
  },

  async rewrites() {
    return [
      {
        source: '/algod/:path*',
        destination: 'https://testnet-algorand.api.purestake.io/idx2/:path*',
      },
    ]
  },
})

module.exports = moduleExports