import React, { useContext } from 'react'
import Image from 'next/image'

//MUI components
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

//Custom hooks and context
import { WalletContext } from '@/context/walletContext'

const styles = {
  accordionStyles: {
    border: 'solid 1px',
    borderColor: 'secondary.main',
    borderRadius: '0.2rem',
    width: 'fit-content',
    mx: 'auto',
    boxShadow: 'none',
    mt: '1rem',
    ['@media(min-width:1200px)']: {
      px: '2rem',
    },
    ['&.Mui-expanded']: { minHeight: 'auto', mx: 'auto' },
    '.MuiAccordionSummary-root': {
      minHeight: 'auto !important',
    },
    '.MuiAccordionSummary-content.Mui-expanded': {
      marginBlock: '.5rem',
    },
  },
}
export const ConnectWallet = () => {
  const { formattedAddresses, connect } = useContext(WalletContext)
  return (
    <>
      <Accordion sx={styles.accordionStyles}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'secondary.main' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            variant="p"
            fontWeight={700}
            textAlign={'center'}
            textTransform={'uppercase'}
            fontSize={'.9rem'}
            color={'secondary.main'}
          >
            Connect {formattedAddresses.length > 0 ? 'Another' : 'A'} Wallet
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '.7rem',
              mb: '1rem',
              img: {
                borderRadius: '100%',
              },
            }}
          >
            <Image
              src="/Pera-logo.png"
              alt="Pera-wallet logo"
              height={28}
              width={28}
            />
            <LoadingButton
              variant="contained"
              onClick={() => connect('pera')}
              sx={{ width: '100%' }}
            >
              Connect with Pera
            </LoadingButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '.7rem',
              mb: '.6rem',
            }}
          >
            <Image
              src="/My-Algo-Wallet-icon.svg"
              alt="MyAlgo logo"
              height={24}
              width={24}
            />
            <LoadingButton
              variant="contained"
              onClick={() => connect('myAlgo')}
            >
              Connect with MyALGO
            </LoadingButton>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
