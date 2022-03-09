import React from 'react'
import '@/styles/global.css'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'

import getTheme from '@/themes/getTheme'
import createEmotionCache from '@/utils/createEmotionCache'
import {Layout} from '@/components/Layout'

import {Provider} from '@/components/Provider/MailboxContext'
import Mailbox from '@/lib/Mailbox'

const theme = getTheme('normal')
const DEFAULT_CONFIG = {
  algod: {
    'uri':'https://testnet.algoexplorerapi.io',
    'token':''
  },
  indexer: {
    'uri':'https://algoindexer.testnet.algoexplorerapi.io',
    'token':''
  }
}

const mailbox = new Mailbox({config: DEFAULT_CONFIG})
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Provider mailbox={mailbox}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}

export default appWithTranslation(App)
