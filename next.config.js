const withPWA = require('next-pwa')
const { i18n } = require('./next-i18next.config')
/** @type {import('next').NextConfig} */
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
}

module.exports = withPWA(nextConfig)
