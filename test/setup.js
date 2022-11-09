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
