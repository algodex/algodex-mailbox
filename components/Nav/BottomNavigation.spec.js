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
