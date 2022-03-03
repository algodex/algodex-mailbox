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
        to="/send-asset"
        value="/send-asset"
        label={t('/send-asset')}
        icon={<SendIcon />}
      />
      <BottomNavigationAction
        to="/send-history"
        value="/send-history"
        label={t('/send-history')}
        icon={<HistoryIcon />}
      />
      <BottomNavigationAction
        to="/redeem-asset"
        value="/redeem-asset"
        label={t('/redeem-asset')}
        icon={<RedeemIcon />}
      />
    </MUIBottomNavigation>
  )
}

BottomNavigation.propTypes = {
  onChange: PropTypes.func
}

export default BottomNavigation
