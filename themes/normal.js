import { createTheme } from '@mui/material/styles'

const muiTheme = createTheme()

/**
 * Font Families
 *
 * Reusable fonts to use in Typography
 * @type {{heading: string, monospace: string, body: string}}
 */
const fontFamilies = {
  heading: '\'Alliance No.1\', Inter, sans-serif',
  body: 'Inter, sans-serif',
  monospace: '\'Roboto Mono\', monospace',
}

/**
 * Font Sizes
 *
 * Sizes for fonts to be consistent
 *
 * @type {number[]}
 */
const fontSizes = [
  '0.625rem',
  '0.75rem',
  '0.875rem',
  '1rem',
  '1.25rem',
  '1.6rem',
  '2rem',
  '2.5rem',
  '3rem',
  '4rem',
]

/**
 * Normal Theme
 *
 * MUI Theme used on the first render
 *
 * @see https://mui.com/customization/default-theme/
 */
const theme = {
  // Apply the default theme
  ...muiTheme,
  typography: {
    // Apply the default typography
    ...muiTheme.typography,
    // Override Typography with Responsive Text
    title: {
      as: 'h1',
      fontFamily: fontFamilies.heading,
      fontSize: fontSizes[7],
      [muiTheme.breakpoints.up('md')]: {
        fontSize: fontSizes[8],
      },
      [muiTheme.breakpoints.up('lg')]: {
        fontSize: fontSizes[9],
      },
      fontWeight: 700,
      lineHeight: '0.9',
      letterSpacing: '-0.04em',
    },
    // Add custom error message variant
    'error-message': {
      fontStyle: 'italic',
      fontFamily: fontFamilies.body,
      fontWeight: 700,
      fontSize: fontSizes[3],
    },
    p: {
      display: 'block',
    },
  },
  // Color System
  palette: {
    ...muiTheme.palette,
    primary: {
      light: '#fcfcff',
      main: '#c9c9e7',
      dark: '#9898b5',
      contrastText: '#000000',
    },
    secondary: {
      light: '#fffcff',
      main: '#d8c9e7',
      dark: '#a698b5',
      contrastText: '#000000',
    },
    accent: {
      light: '#fffffc',
      main: '#E7E7C9',
      dark: '#b5b598',
      contrastText: '#000000',
    },
  },
}

export default theme
