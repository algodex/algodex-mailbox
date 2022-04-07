import React from 'react'

// MUI Components
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const accordionStyles ={
  marginBlock:'2rem',
  border: '2px solid #2D3748',
  borderRadius: '6px',
}
export const FAQ = () => {
  return (
    <section className="faq-wrapper">
      <Container>
        <div className="inner-wrapper">
          <Grid
            container
            spacing={4}
            sx={{ marginBottom: '2rem', marginTop: '1rem' }}
          >
            <Grid item md={11} lg={10} sx={{ marginInline: 'auto' }}>
              <h3>FAQ</h3>
              <div className="title-line"></div>
              <div style={{ marginBlock: '2rem' }}>
                <Accordion sx={accordionStyles}>
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
                <Accordion sx={accordionStyles}>
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

                <Accordion sx={accordionStyles}>
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
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  )
}
