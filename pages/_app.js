import React, { Component } from "react";

// Material UI
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, Global, css } from "@emotion/react";
import createEmotionCache from "utils/createEmotionCache";

//Algodex
import theme from "theme";
import Head from "next/head";

const clientSideEmotionCache = createEmotionCache();

export default function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Algodex Mailbox</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

{
  /*
App.propTypes = {
    Component,
    pageProps: PropTypes.object.isRequired
}
*/
}
