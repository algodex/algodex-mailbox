import React from 'react'
import Image from 'next/image'

// MUI Components
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const styles = {
  titleLine: {
    width: '368px',
    maxWidth: '100%',
    border: '0.01rem solid',
    borderColor: 'secondary.contrastText',
  },
  guideContainer: {
    backgroundColor: 'primary.main',
    border: '0.25rem solid',
    borderColor: 'secondary.contrastText',
    borderRadius: '0.3rem',
    minHeight: '17rem',
    padding: '0.8rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
    '@media (min-width: 400px)': {
      width: '21rem',
      maxWidth: '100%',
    },
    '& ul': {
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      width: 'fit-content',
      margin: 'auto',
      listStyle: 'auto',
    },
  },
  illustration: {
    marginBottom: '0.7rem',
  },
  descriptiveLine: {
    borderBottom: '0.25rem solid',
    borderColor: 'secondary.contrastText',
    position: 'relative',
    marginInline: 'auto',
    marginBlock: '7rem',
    '@media (max-width: 900px)': {
      display: 'none',
    },
    '&::before': {
      top: '0',
      bottom: '0',
      width: '1rem',
      height: '5rem',
      content: '""',
      position: 'absolute',
      borderLeft: '0.25rem solid',
      borderColor: 'secondary.contrastText',
      left: '0',
    },
    '&::after': {
      bottom: '0',
      width: '1rem',
      height: '5rem',
      content: '""',
      position: 'absolute',
      borderRight: '0.25rem solid',
      borderColor: 'secondary.contrastText',
      right: '0',
      top: '-5rem',
    },
  },
  note: {
    backgroundColor: 'accent.light',
    border: '0.25rem solid',
    borderColor: 'secondary.contrastText',
    borderRadius: '0.3rem',
    padding: '1.5rem 2.5rem',
  },
}
export const UserGuide = () => {
  return (
    <Box id="user-guide">
      <Container>
        <Typography
          variant="h3"
          sx={{
            color: 'accent.contrastText',
            marginBottom: 0,
            marginTop: '2rem',
          }}
        >
          How to Send
        </Typography>
        <Divider sx={styles.titleLine}></Divider>
        <Grid
          container
          spacing={4}
          sx={{ marginBottom: '2rem', marginTop: '1rem' }}
        >
          <Grid item md={4} marginX="auto">
            <Box sx={styles.guideContainer}>
              <Box sx={styles.illustration}>
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
          <Grid item md={4} marginX="auto">
            <Box sx={styles.guideContainer}>
              <Box sx={styles.illustration}>
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
          <Grid item md={4} marginX="auto">
            <Box sx={styles.guideContainer}>
              <Box sx={styles.illustration}>
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
        <Box sx={styles.descriptiveLine} width="70%"></Box>
        <Typography variant="h3">How to Redeem</Typography>
        <Divider sx={styles.titleLine}></Divider>
        <Grid
          container
          spacing={4}
          sx={{ marginBottom: '2rem', marginTop: '1rem' }}
        >
          <Grid item md={4} marginX="auto">
            <Box sx={styles.guideContainer}>
              <Box sx={styles.illustration}>
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
          <Grid item md={4} marginX="auto">
            <Box sx={styles.guideContainer}>
              <Box sx={styles.illustration}>
                <Image
                  src="/Approve.png"
                  alt="Approve"
                  width={103}
                  height={103}
                />
              </Box>
              <Typography variant="p" sx={{ marginBottom: 0 }}>
                Go to “Redeem Assets” and enter information required:
              </Typography>
              <ul>
                <li>Asset ID </li>
                <li>Sender Address</li>
                <li>Recieving Address</li>
              </ul>
            </Box>
          </Grid>
          <Grid item md={4} marginX="auto">
            <Box sx={styles.guideContainer}>
              <Box sx={styles.illustration}>
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
          sx={{
            ...styles.descriptiveLine,
            marginRight: '11rem',
          }}
          width="40%"
        ></Box>
        <Grid container spacing={4} sx={{ marginBlock: '2rem' }}>
          <Grid item md={11} lg={10} xl={10} sx={{ marginInline: 'auto' }}>
            <Box sx={styles.note}>
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
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
