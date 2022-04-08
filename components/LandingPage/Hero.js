import React, { useState } from 'react'
import DefaultToolbar from '@/components/Nav/Toolbar'
import Image from 'next/image'
import Link from '../Nav/Link'
import { useTranslation } from 'next-i18next'

// MUI Components
import AppBar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

// Icons
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import LiveHelpIcon from '@mui/icons-material/LiveHelp'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

// Hooks
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Drawer from '../Nav/Drawer'

export const Hero = () => {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [openDrawer, setOpenDrawer] = useState(false)
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }
  const links = [
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
  return (
    <section className="hero">
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <DefaultToolbar
          isMobile={isMobile}
          isDashboard={false}
          toggleDrawer={toggleDrawer}
        />
        {/* Mobile side Drawer */}
        <Drawer
          open={openDrawer}
          width={'80%'}
          links={links}
          toggleDrawer={toggleDrawer}
        />
      </AppBar>
      {/* Display the other part of the hero component */}
      <Container>
        <Grid container spacing={2} sx={{ marginBlock: '2rem' }}>
          <Grid item xs={12} md={8} lg={7} xl={6}>
            <div className="hero-card">
              <div className="border">
                <Image
                  src="/algodex-logo.svg"
                  alt="Algodex Logo"
                  width="300"
                  height="50"
                />
                <h3>Mailbox</h3>
                <Image
                  src="/Powered-by-Algorand.png"
                  alt="Powered by Algorand"
                  width="150"
                  height="20"
                />
                <p>
                  Algodex Mailbox is a decentralized web application that allows
                  users to send Algorand Standard Assets even if recipients
                  haven’t opted into the asset yet. <br /> <br />
                  Useful when sending to one wallet or thousands. <br /> <br />
                  <strong>Try on testnet Now:</strong>
                </p>
                <Link href="/send-assets">
                  <Button
                    variant="outlined"
                    sx={{
                      color: (theme) => theme.palette.primary.contrastText,
                      borderColor: (theme) =>
                        theme.palette.primary.contrastText,
                    }}
                  >
                    LAUNCH ON TESTNET
                  </Button>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}
