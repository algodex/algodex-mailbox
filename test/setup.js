import React from 'react'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'

import createEmotionCache from '@/utils/createEmotionCache'
import { render } from '@testing-library/react'
import getTheme from '../themes/getTheme'

const theme = getTheme('normal')

const clientSideEmotionCache = createEmotionCache()
clientSideEmotionCache.compat = true

const Providers = ({ children }) => (
  <CacheProvider value={clientSideEmotionCache}>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </CacheProvider>
)

const customRender = (ui, options = {}) => render(ui, { wrapper: Providers, ...options })
export * from '@testing-library/react'
export { customRender as render }
