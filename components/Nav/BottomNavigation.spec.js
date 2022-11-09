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
import { matchers } from '@emotion/jest'
import BottomNavigation from './BottomNavigation'
import {render} from '@/test/setup'
expect.extend(matchers)
jest.mock('next/dist/client/router', () => require('next-router-mock'))
jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}))
describe('BottomNavigation', ()=>{
  it('should have routable links', ()=>{
    const { queryByTestId } = render(
      <BottomNavigation/>
    )
    expect(queryByTestId('nav-mobile-send-assets')).not.toBeNull()
  })
})
