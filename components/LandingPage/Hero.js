import React from 'react'
import DefaultToolbar from '@/components/Nav/Toolbar'
import Image from 'next/image'


// MUI Components
import AppBar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

export const Hero = () => {
  return (
    <section className="hero">
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <DefaultToolbar />
      </AppBar>
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
                <Button
                  variant="outlined"
                  sx={{
                    color: (theme) => theme.palette.primary.contrastText,
                    borderColor: (theme) => theme.palette.primary.contrastText,
                  }}
                >
                  LAUNCH ON TESTNET
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}
