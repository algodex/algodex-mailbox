/* 
 * Algodex Mailbox 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */
import React from 'react';
import '@/styles/global.css';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import mediaQuery from 'css-mediaquery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';

import getTheme from '@/themes/getTheme';
import createEmotionCache from '@/utils/createEmotionCache';
import parser from 'ua-parser-js';
import NextApp from 'next/app';
import Layout from '@/components/Layout';
import { WalletProvider } from '@/context/walletContext';

import UnderMaintenance from '@/components/maintenance';

const theme = getTheme('normal');
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const mobileSsrMatchMedia = (query) => ({
  matches: mediaQuery.match(query, {
    // The estimated CSS width of the browser.
    width: '0px',
  }),
});
const desktopSsrMatchMedia = (query) => ({
  matches: mediaQuery.match(query, {
    // The estimated CSS width of the browser.
    width: '1024px',
  }),
});

const mobileMuiTheme = createTheme({
  ...theme,
  components: {
    ...theme.components,
    MuiUseMediaQuery: { defaultProps: { ssrMatchMedia: mobileSsrMatchMedia } },
  },
});
const desktopMuiTheme = createTheme({
  ...theme,
  components: {
    ...theme.components,
    MuiUseMediaQuery: { defaultProps: { ssrMatchMedia: desktopSsrMatchMedia } },
  },
});

export function App(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    router,
  } = props;
  console.debug(props);

  const maintenance = true;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider
        theme={
          pageProps.deviceType === 'mobile' ? mobileMuiTheme : desktopMuiTheme
        }
      >
        <CssBaseline />
        {maintenance ? (
          <UnderMaintenance />
        ) : (
          <WalletProvider>
            <Layout router={router}>
              <Component {...pageProps} />
            </Layout>
          </WalletProvider>
        )}
      </ThemeProvider>
    </CacheProvider>
  );
}
App.getInitialProps = async (ctx) => {
  const initialProps = await NextApp.getInitialProps(ctx);
  const deviceType =
    parser(ctx.ctx.req.headers['user-agent']).device.type || 'desktop';
  return { pageProps: { ...initialProps, deviceType } };
};
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default appWithTranslation(App);
