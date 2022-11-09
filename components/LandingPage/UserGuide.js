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

/* eslint-disable max-len */
import React from 'react'
import { useTranslation } from 'next-i18next'

// MUI Components
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import { GuideContainer } from './GuideContainer'

const styles = {
  titleLine: {
    width: '368px',
    maxWidth: '100%',
    border: '0.01rem solid',
    borderColor: 'secondary.contrastText',
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
    '&::before, &::after': {
      bottom: '0',
      width: '1rem',
      height: '5rem',
      content: '""',
      position: 'absolute',
      borderColor: 'secondary.contrastText',
    },
    '&::before': {
      top: '0',
      left: '0',
      borderLeft: '0.25rem solid',
    },
    '&::after': {
      right: '0',
      top: '-5rem',
      borderRight: '0.25rem solid',
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
  const { t } = useTranslation('common')
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
          {t('how-to-send')}
        </Typography>
        <Divider sx={styles.titleLine}></Divider>
        <Grid
          container
          spacing={4}
          sx={{ marginBottom: '2rem', marginTop: '1rem' }}
        >
          <GuideContainer
            icon={'wallet-icon'}
            content="Connect sending wallet to application and enter ASA Asset ID you  wish to send"
          />

          <GuideContainer
            icon={'Spreadsheet'}
            content="Create and upload CSV file with wallet addresses and amounts to be sent"
          />

          <GuideContainer
            icon={'Airploneicon'}
            content="Send assets and inform recipients to redeem them on Algodex Mailbox. You need to provide the sending wallet address which users will need to claim the ASAs"
          />
        </Grid>
        <Box sx={styles.descriptiveLine} width="70%"></Box>
        <Typography variant="h3">{t('how-to-redeem')}</Typography>
        <Divider sx={styles.titleLine}></Divider>
        <Grid
          container
          spacing={4}
          sx={{ marginBottom: '2rem', marginTop: '1rem' }}
        >
          <GuideContainer
            icon={'wallet-add-lite'}
            content="Opt-in to the ASA you wish to redeem in your Algorand wallet. You will need the sender’s Wallet address as well"
          />

          <GuideContainer
            icon={'Approve'}
            content="Go to “Redeem Assets” and enter information required"
          />

          <GuideContainer
            icon={'Dark-Trail'}
            content="Click “Redeem” and assets will be sent to your wallet"
            contentStyle={{ marginBottom: 0 }}
            list={['Asset ID', 'Sender Address', 'Recieving Address']}
          />
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
              <Typography variant="p">
                {t(
                  'Senders are also able to reclaim assets that have not been redeemed. Only the ASA sender can return assets to themselves. ASAs that have been redeemed by the recipient cannot be unsent and returned'
                )}
                .
              </Typography>
              <Typography
                variant="p"
                color="secondary.contrastText"
                fontWeight={700}
              >
                {t('More detailed instructions here')}:{' '}
                <Link
                  href="https://docs.algodex.com/algodex-mailbox/mailbox-user-guide"
                  target="_blanc"
                  color="secondary.contrastText"
                  fontStyle="italic"
                >
                  {t('Mailbox User Guide')}
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
