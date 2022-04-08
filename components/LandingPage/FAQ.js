import React from 'react'

// MUI Components
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

const styles = {
  faqWrapper: {
    paddingBlock: {
      md: '2rem',
    },
    backgroundColor: {
      xs: 'primary.dark',
      sm: 'primary.dark',
      md:'secondary.dark',
    },
  },
  titleLine: {
    width: '368px',
    maxWidth: '100%',
    border: '0.01rem solid',
    borderColor: 'accent.light',
  },
  accordionStyles: {
    marginBlock: '2rem',
    border: '2px solid',
    borderColor: 'secondary.contrastText',
    borderRadius: '6px',
  },
  innerWrapper: {
    backgroundColor: 'primary.dark',
    '& h3': {
      color: 'accent.light',
      margin: 0,
    },
  },
}
export const FAQ = () => {
  return (
    <Box id="faq" sx={styles.faqWrapper}>
      <Container>
        <Box sx={styles.innerWrapper}>
          <Grid
            container
            spacing={4}
            sx={{ marginBottom: '2rem', marginTop: '1rem' }}
          >
            <Grid
              item
              md={11}
              lg={10}
              sx={{ marginInline: 'auto', overflow: 'hidden' }}
            >
              <Typography variant="h3">FAQ</Typography>
              <Divider sx={styles.titleLine}></Divider>
              <Box sx={{ marginBlock: '2rem' }}>
                <Accordion sx={styles.accordionStyles}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>How does Algodex Mailbox work?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Algodex Mailbox uses Algorand smart contracts to create an
                      escrow that holds sent Algorand Standard Assets before
                      they are redeemed. The smart contract escrow exists
                      entirely on the Algorand blockchain so nobody, including
                      Algodex Mailbox, can access the escrow except for the
                      sender and recipient.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={styles.accordionStyles}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>
                      What Algorand Standard Assets can be send using Algodex
                      Mailbox?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Algodex Mailbox uses Algorand smart contracts to create an
                      escrow that holds sent Algorand Standard Assets before
                      they are redeemed. The smart contract escrow exists
                      entirely on the Algorand blockchain so nobody, including
                      Algodex Mailbox, can access the escrow except for the
                      sender and recipient.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion sx={styles.accordionStyles}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography>
                      What Algorand Standard Assets can be send using Algodex
                      Mailbox?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Algodex Mailbox uses Algorand smart contracts to create an
                      escrow that holds sent Algorand Standard Assets before
                      they are redeemed. The smart contract escrow exists
                      entirely on the Algorand blockchain so nobody, including
                      Algodex Mailbox, can access the escrow except for the
                      sender and recipient.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
