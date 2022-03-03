import { createTheme } from '@mui/material/styles'
import { red, pink, purple } from '@mui/material/colors'

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
  monospace: '\'Roboto Mono\', monospace'
}

/**
 * Font Sizes
 *
 * Sizes for fonts to be consistent
 *
 * @type {number[]}
 */
const fontSizes = [10, 12, 14, 16, 20, 24, 32, 40, 48, 64]

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
  typography:{
    // Apply the default typography
    ...muiTheme.typography,
    // Override Typography with Responsive Text
    title: {
      as: 'h1',
      fontFamily: fontFamilies.heading,
      fontSize: fontSizes[7],
      [muiTheme.breakpoints.up('md')]: {
        fontSize: fontSizes[8]
      },
      [muiTheme.breakpoints.up('lg')]: {
        fontSize: fontSizes[9]
      },
      fontWeight: 700,
      lineHeight: '0.9',
      letterSpacing: '-0.04em'
    },
  },
  // Color System
  palette: {
    ...muiTheme.palette,
    primary: {
      main: purple.A400,
    },
    secondary: {
      main: pink.A400,
    },
    error: {
      main: red.A400,
    }
  },
}

export default theme
