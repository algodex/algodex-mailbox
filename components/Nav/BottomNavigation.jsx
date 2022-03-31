/* 
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {useRouter} from 'next/router'

// MUI Components
import MUIBottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

// Icons
import SendIcon from '@mui/icons-material/Send'
import HistoryIcon from '@mui/icons-material/History'
import RedeemIcon from '@mui/icons-material/Redeem'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'

/**
 * Bottom Navigation
 * @param onChange
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
function BottomNavigation({onChange, ...rest}) {
  const {t} = useTranslation('common')
  const router = useRouter()
  // activeNav is set when the application routes to a new page
  const activeNav = router.asPath

  // Default onChange behavior
  const _onChange = useCallback((e, newValue)=>{
    router.push(newValue)
  }, [router])

  return (
    <MUIBottomNavigation
      showLabels
      value={activeNav}
      onChange={onChange || _onChange}
      {...rest}
    >
      <BottomNavigationAction
        to="/send-assets"
        value="/send-assets"
        label={t('/send')}
        icon={<SendIcon />}
      />
      <BottomNavigationAction
        to="/transaction-history"
        value="/transaction-history"
        label={t('/history')}
        icon={<HistoryIcon />}
      />
      <BottomNavigationAction
        to="/redeem-assets"
        value="/redeem-assets"
        label={t('/redeem')}
        icon={<RedeemIcon />}
      />
      <BottomNavigationAction
        to="/return-assets"
        value="/return-assets"
        label={t('/return')}
        icon={<KeyboardReturnIcon />}
      />
    </MUIBottomNavigation>
  )
}

BottomNavigation.propTypes = {
  onChange: PropTypes.func
}

export default BottomNavigation
