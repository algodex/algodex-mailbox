/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'

// Hooks
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

// MUI Components
import AppBar from '@mui/material/AppBar'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

// Defaults
import DefaultToolbar from '@/components/Nav/Toolbar'
import DefaultBottomNavigation from '@/components/Nav/BottomNavigation'
import DefaultDrawer from '@/components/Nav/Drawer'

// Icons
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import LiveHelpIcon from '@mui/icons-material/LiveHelp'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SendIcon from '@mui/icons-material/Send'
import HistoryIcon from '@mui/icons-material/History'
import RedeemIcon from '@mui/icons-material/Redeem'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'

/**
 * Layout Component
 *
 * Component includes three slots
 *
 * @param children
 * @param components
 * @param componentsProps
 * @returns {JSX.Element}
 * @component
 */
export function Layout({ children, components, componentsProps, router }) {
  const isHomepage = router.pathname === '/'
  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const { Toolbar, BottomNavigation, Drawer } = components

  const [drawerOpen, setDrawerOpen] = useState(!isHomepage)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const sideLinks = [
    {
      to: `/${router.locale}/send-assets`,
      icon: <SendIcon />,
      primary: t('/send-assets'),
    },
    {
      to: `/${router.locale}/transaction-history`,
      icon: <HistoryIcon />,
      primary: t('/transaction-history'),
    },
    {
      to: `/${router.locale}/redeem-assets`,
      icon: <RedeemIcon />,
      primary: t('/redeem-assets'),
    },
    {
      to: `/${router.locale}/return-assets`,
      icon: <KeyboardReturnIcon />,
      primary: t('/return-assets'),
    },
  ]

  const homeLinks = [
    {
      to: '/#user-guide',
      icon: <LightbulbIcon />,
      primary: t('user-guide'),
    },
    {
      to: '/#faq',
      icon: <LiveHelpIcon />,
      primary: t('faq'),
    },
    {
      to: 'https://about.algodex.com/support/',
      icon: <HelpOutlineIcon />,
      primary: t('support'),
    },
  ]
  // Example of a Responsive Layout with Fixed Viewport
  console.log({drawerOpen})
  console.log({isMobile})
  console.log({isHomepage})
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        maxHeight: '-webkit-fill-available',
      }}
    >
      <AppBar
        position="static"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          isMobile={isMobile}
          toggleDrawer={toggleDrawer}
          router={router}
          {...componentsProps.Toolbar}
        />
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          overflowY: 'auto'
        }}
      >
        <Drawer
          open={drawerOpen && !(!isHomepage && isMobile)}
          links={isHomepage ? homeLinks : sideLinks}
          router={router}
          {...componentsProps.Drawer}
        />
        {children}
      </Box>
      {
        // Show the Mobile Navigation
        isMobile && !isHomepage && (
          <Paper
            sx={{
              position: 'static',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            elevation={3}
          >
            <BottomNavigation {...componentsProps.BottomNavigation} />
          </Paper>
        )
      }
    </Box>
  )
}

Layout.propTypes = {
  components: PropTypes.shape({
    Toolbar: PropTypes.elementType.isRequired,
    BottomNavigation: PropTypes.elementType.isRequired,
    Drawer: PropTypes.elementType.isRequired,
  }).isRequired,
}

Layout.defaultProps = {
  components: {
    Toolbar: DefaultToolbar,
    BottomNavigation: DefaultBottomNavigation,
    Drawer: DefaultDrawer,
  },
  componentsProps: {
    Toolbar: {},
    BottomNavigation: {},
    Drawer: {},
  },
}

export default Layout
