/* 
 * Algodex Service 
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
    // Add custom status message variant
    'status-message': {
      fontStyle: 'italic',
      fontFamily: fontFamilies.body,
      fontWeight: 700,
      fontSize: fontSizes[3],
      wordBreak: 'break-word',
    },
    p: {
      display: 'block',
    },
    h3: {
      fontSize: '2rem',
      margin: 0,
      fontWeight: 500,
    },
  },
  // Color System
  palette: {
    ...muiTheme.palette,
    primary: {
      light: '#fcfcff',
      main: '#c9c9e5',
      dark: '#A698B5',
      contrastText: '#000000',
    },
    secondary: {
      light: '#fffcff',
      main: '#9898b5',
      dark: '#4A5568',
      contrastText: '#2D3748',
    },
    accent: {
      light: '#F2F2F2',
      main: '#e3e3e4',
      dark: '#dedede',
      contrastText: '#2F3746',
    },
    grey:{
      main:'#6C6C6C'
    },
    progress:{
      main:'#7B61FF'
    },
    info: {
      main: '#3944BC',
      success: '#3BB042',
      error: '#EF0F1E',
    },
  },
}

export default theme
