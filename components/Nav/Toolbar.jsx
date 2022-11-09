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

/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'

// MUI Components
import MUIToolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Image from 'next/image'

// Custom Language Selector
import LocaleNavMenu from '@/components/Nav/LocaleNavMenu'

//Algodex
import Helper from '@/lib/helper'
import Link from './Link'

/**
 * Toolbar
 * @param title
 * @param height
 * @param isMobile
 * @param onClick
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */

const environmentLinks = ['TESTNET', 'MAINNET']

const styles = {
  select: {
    fontSize: '0.8rem',
    marginBlock: '0.25rem',
    border: 'solid 1px',
  },
  linkStyles: {
    fontWeight: '700',
    marginRight: '1.6rem',
    textDecoration: 'none',
    color: (theme) => theme.palette.accent.contrastText,
  },
}

const MAINNET_LINK = process.env.NEXT_PUBLIC_MAINNET_LINK
const TESTNET_LINK = process.env.NEXT_PUBLIC_TESTNET_LINK
const ENABLE_NETWORK_SELECTION = TESTNET_LINK && MAINNET_LINK
function Toolbar({
  title,
  height,
  isMobile,
  onClick,
  toggleDrawer,
  router,
  ...rest
}) {
  const CURRENT_PAGE = router.pathname

  const isDashboard = router.pathname !== '/'

  const { t } = useTranslation('common')
  const { environment } = Helper.getAlgodex()

  const [environmentText, setEnvironmentText] = React.useState(
    environment.toUpperCase()
  )

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    if (ENABLE_NETWORK_SELECTION) {
      setEnvironmentText(value)
      if (value === 'MAINNET') {
        window.location = `${MAINNET_LINK}${CURRENT_PAGE}`
      } else {
        window.location = `${TESTNET_LINK}${CURRENT_PAGE}`
      }
    }
  }

  return (
    <MUIToolbar sx={{ height }} {...rest}>
      {!isMobile && isDashboard && (
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
          <Image
            src="/algodex-logo.svg"
            alt="Algodex logo"
            height={25}
            width={165}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: '24px',
              '@media (max-width: 780px)': {
                fontSize: '18px',
              },
              color: 'accent.contrastText',
            }}
            marginRight={2}
            marginLeft="0.2rem"
            lineHeight={0}
          >
            {title || t('mailbox')}
          </Typography>
        </Box>
        {isDashboard && (
          <Select data-testid='environment-selection'
            className="environment-select-wrapper"
            value={environmentText}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              ...styles.select,
              color: environmentText === 'TESTNET' ? 'info.success' : 'info.main',
            }}
          >
            {environmentLinks.map((environment) => (
              <MenuItem key={environment} value={environment}>
                {environment}
              </MenuItem>
            ))}
          </Select>
        )}
      </Box>
      {!isMobile && (
        <Box sx={{ display: 'flex', alignItems: 'center' }} data-testid='toolbar-links'>
          <Link
            href="https://docs.algodex.com/algodex-mailbox/mailbox-user-guide"
            target="_blanc"
            sx={styles.linkStyles}
          >
            {t('user-guide')}
          </Link>
          <Link href="/#faq" sx={styles.linkStyles}>
            {t('faq')}
          </Link>
          <Link
            href="https://app.algodex.com/support/"
            target="_blanc"
            sx={styles.linkStyles}
          >
            {t('support')}
          </Link>
        </Box>
      )}
      {isMobile && !isDashboard && (
        <IconButton onClick={toggleDrawer} data-testid='menu-btn'>
          <MenuIcon />
        </IconButton>
      )}
      {((!isMobile && !isDashboard) || isDashboard) && (
        <LocaleNavMenu isMobile={isMobile} onClick={onClick} />
      )}
    </MUIToolbar>
  )
}

Toolbar.propTypes = {
  /**
   * onClick
   */
  onClick: PropTypes.func.isRequired,
  /**
   * height
   */
  height: PropTypes.number,
  /**
   * isMobile
   */
  isMobile: PropTypes.bool,

  toggleDrawer: PropTypes.func.isRequired,
}

Toolbar.defaultProps = {
  onClick: console.debug,
}
export default Toolbar
