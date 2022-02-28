import React, { Component } from "react";
import { Grommet } from "grommet";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px",
    },
  },
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <Grommet full theme={theme}>
      <Component {...pageProps} />
    </Grommet>
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
