const path = require('path')
const defaults = ['common']
module.exports = {
  defaults,
  i18n: {
    'locales': ['en', 'es'],
    'defaultLocale': 'en',
    'pages': {
      '*': defaults,
      '/redeem-asset': [...defaults],
      '/send-asset-page': [...defaults],
      '/send-history-page': [...defaults]
    }
  },
  localePath: path.resolve('./locales'),
}
