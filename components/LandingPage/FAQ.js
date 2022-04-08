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
import { FaqQuestions } from './faqQuestions'

const styles = {
  faqWrapper: {
    paddingBlock: {
      md: '3rem',
    },
    backgroundColor: {
      xs: 'primary.dark',
      sm: 'primary.dark',
      md: 'secondary.dark',
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
                {FaqQuestions.map((faq) => (
                  <Accordion sx={styles.accordionStyles} key={faq.q}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{faq.q}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{faq.a}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
                <Accordion sx={styles.accordionStyles}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>How do I use Algodex Mailbox?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Learn to use Algodex Mailbox using our{' '}
                      <a
                        href="https://about.algodex.com/docs/algodex-mailbox-user-guide/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        guide
                      </a>
                      .
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={styles.accordionStyles}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      How many recipients can I send to at one time?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      As many as you like! Algodex Mailbox allows you to
                      configure a CSV file to specify the recipient(s) of an
                      Algorand Standard Asset (ASA) and what quantity each
                      recipient should receive. Learn how to send ASAs using a
                      configurable CSV file using our{' '}
                      <a
                        href="https://about.algodex.com/docs/algodex-mailbox-user-guide/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        guide
                      </a>
                      .
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
                      Where can I follow Algodex and keep up with announcements?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      You can follow Algodex on the following social media
                      websites:
                    </Typography>
                    <ul>
                      <li>
                        Twitter:{' '}
                        <a
                          href="https://twitter.com/AlgodexOfficial"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {' '}
                          @AlgodexOfficial
                        </a>
                      </li>
                      <li>
                        Telegram:
                        <ul>
                          <li>
                            <a
                              href="http://t.me/AlgodexAnnouncements"
                              target="_blank"
                              rel="noreferrer"
                            >
                              t.me/AlgodexAnnouncements
                            </a>
                          </li>
                          <li>
                            <a
                              href="http://t.me/algodex"
                              target="_blank"
                              rel="noreferrer"
                            >
                              t.me/algodex
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        Reddit:{' '}
                        <a
                          href="https://www.reddit.com/r/Algodex/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          @AlgodexOfficial
                        </a>
                      </li>
                    </ul>
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
