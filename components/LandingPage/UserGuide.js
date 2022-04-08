import React from 'react'
import Image from 'next/image'

// MUI Components
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

export const UserGuide = () => {
  return (
    <section className="user-guide-wrapper" id='user-guide'>
      <Container>
        <h3>How to Send</h3>
        <div className="title-line"></div>
        <Grid
          container
          spacing={4}
          sx={{ marginBottom: '2rem', marginTop: '1rem' }}
        >
          <Grid item md={4} marginX='auto'>
            <Box className="guide-container">
              <Box className="illustration">
                <Image
                  src="/wallet-icon.png"
                  alt="Wallet Icon"
                  width={103}
                  height={103}
                />
              </Box>
              <p>
                Connect sending wallet to application and enter ASA Asset ID you
                wish to send.
              </p>
            </Box>
          </Grid>
          <Grid item md={4} marginX='auto'>
            <Box className="guide-container">
              <Box className="illustration">
                <Image
                  src="/Spreadsheet.png"
                  alt="Spreadsheet"
                  width={103}
                  height={103}
                />
              </Box>
              <p>
                Create and upload CSV file with wallet addresses and amounts to
                be sent.
              </p>
            </Box>
          </Grid>
          <Grid item md={4} marginX='auto'>
            <Box className="guide-container">
              <Box className="illustration">
                <Image
                  src="/Airploneicon.png"
                  alt="Airploneicon"
                  width={103}
                  height={103}
                />
              </Box>
              <p>
                Send assets and inform recipients to redeem them on Algodex
                Mailbox. You need to provide the sending wallet address which
                users will need to claim the ASAs.
              </p>
            </Box>
          </Grid>
        </Grid>
        <Box className="descriptive-line" width="70%"></Box>
        <h3>How to Redeem</h3>
        <Box className="title-line"></Box>
        <Grid
          container
          spacing={4}
          sx={{ marginBottom: '2rem', marginTop: '1rem' }}
        >
          <Grid item md={4} marginX='auto'>
            <Box className="guide-container">
              <Box className="illustration">
                <Image
                  src="/Wallet-Add-Lite.png"
                  alt="wallet"
                  width={103}
                  height={103}
                />
              </Box>
              <p>
                Opt-in to the ASA you wish to redeem in your Algorand wallet.
                You will need the sender’s Wallet address as well.
              </p>
            </Box>
          </Grid>
          <Grid item md={4} marginX='auto'>
            <Box className="guide-container">
              <Box className="illustration">
                <Image
                  src="/Approve.png"
                  alt="Approve"
                  width={103}
                  height={103}
                />
              </Box>
              <p className="mb-0">
                Go to “Redeem Assets” and enter information required:
              </p>
              <ul>
                <li>Asset ID </li>
                <li>Sender Address</li>
                <li>Recieving Address</li>
              </ul>
            </Box>
          </Grid>
          <Grid item md={4} marginX='auto'>
            <Box className="guide-container">
              <Box className="illustration">
                <Image
                  src="/Dark-Trail.png"
                  alt="Trail"
                  width={103}
                  height={103}
                />
              </Box>
              <p>Click “Redeem” and assets will be sent to your wallet.</p>
            </Box>
          </Grid>
        </Grid>
        <Box
          className="descriptive-line line2"
          width="40%"
        ></Box>
        <Grid container spacing={4} sx={{ marginBlock: '2rem' }}>
          <Grid item md={11} lg={10} xl={10} sx={{ marginInline: 'auto' }}>
            <div className="note">
              <p>
                Senders are also able to reclaim assets that have not been
                redeemed. Only the ASA sender can return assets to themselves.
                ASAs that have been redeemed by the recipient cannot be unsent
                and returned.
              </p>
              <p>
                <b>
                  <u>More detailed instructions here: Mailbox User Guide</u>
                </b>
              </p>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}
