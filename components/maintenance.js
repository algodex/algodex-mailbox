import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

// MUI Components
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// Hooks
import Typography from '@mui/material/Typography';

// Algodex
import Helper from '@/lib/helper';

const styles = {
  hero: {
    minHeight: '100vh',
    background: 'url("/Space-Background.png") no-repeat',
    position: 'relative',
    backgroundSize: 'cover',
    overflow: 'hidden',
    '&::after': {
      position: 'absolute',
      background: 'url("/Airwave.png") no-repeat',
      pointerEvents: 'none',
      backgroundSize: 'cover',
      top: '3vh',
      bottom: '0',
      width: '100%',
      height: '100%',
      content: '""',
      '@media (min-width: 780px) and (max-width: 1000px)': {
        top: '90px',
      },
      '@media (max-width: 350px)': {
        display: 'none',
      },
    },
    '@media (max-width: 780px)': {
      background: 'none',
      '&::after': {
        background: 'url("/Airwave-sm.png") no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'bottom',
        top: '17%',
      },
    },
  },
  heroCard: {
    backgroundColor: 'accent.main',
    padding: '0.68rem',
    marginTop: '7vh',
    minHeight: '59vh',
  },
  border: {
    border: '0.3rem solid #1a202c',
    padding: '1.5rem',
    minHeight: '59vh',
    '@media(min-width:1200px)': {
      padding: '3vw',
    },
    '@media(min-width:1500px)': {
      padding: '4vw',
    },
  },
};
export default function UnderMaintenance() {
  const { t } = useTranslation('common');
  const { environment } = Helper.getAlgodex();

  return (
    <Box sx={styles.hero}>
      <Container>
        <Grid
          container
          spacing={2}
          sx={{ marginTop: '3rem', marginBottom: '2rem' }}
        >
          <Grid item xs={12} md={8} lg={7} xl={8}>
            <Box sx={styles.heroCard}>
              <Box sx={styles.border}>
                <Image
                  src='/algodex-logo.svg'
                  alt='Algodex Logo'
                  width='300'
                  height='50'
                />
                <Typography variant='h3' color='accent.contrastText'>
                  {t('mailbox')}
                </Typography>
                <Image
                  src='/Powered-by-Algorand.svg'
                  alt='Powered by Algorand'
                  width='150'
                  height='20'
                />
                <p>
                  <Typography variant='h3' color='accent.contrastText'>
                    Algodex Mailbox is temporarily offline for the purpose of
                    making some upgrades to ensure the consistency and quality
                    of the user experience. Thank you for your patience.
                  </Typography>
                </p>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
