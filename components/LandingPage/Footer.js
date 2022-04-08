/* eslint-disable max-len */
import React from 'react'
import Image from 'next/image'
import Link from '../Nav/Link'

// MUI Components
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

export const LandingPageFooter = () => {
  return (
    <section className="footer-wrapper">
      <Container>
        <Grid container spacing={4}>
          <Grid item md={6} lg={6} xl={5}>
            <Typography
              variant="p"
              fontWeight={700}
              marginBottom="2rem"
              sx={{
                color: (theme) => theme.palette.accent.light,
              }}
            >
              Stay up to date with info on Algodex updates, new features, and
              releases by joining our mailing list.
            </Typography>
            <div className="input-container">
              <span className="icon">
                <MailOutlineIcon fontSize="small" />
              </span>
              <input type="text" placeholder="Email Address" />

              <Button
                variant="outlined"
                sx={{
                  color: (theme) => theme.palette.primary.contrastText,
                  borderColor: (theme) => theme.palette.primary.contrastText,
                  backgroundColor: (theme) => theme.palette.accent.light,
                }}
              >
                Submit
              </Button>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginBlock: '2rem' }}>
          <Grid item md={11} lg={10} xl={9} marginX="auto">
            <Divider
              sx={{
                backgroundColor: (theme) => theme.palette.accent.light,
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginBottom: '2rem' }}>
          <Grid item sm={10} md={10} lg={5} xl={5}>
            <Image
              src="/Algodex-Logo White.png"
              alt="Algodex logo"
              height={48}
              width={300}
            />
            <Typography variant="p" marginTop="1rem" className="title">
              Decentralized marketplace on Algorand
            </Typography>
          </Grid>
          <Grid item sm={4} md={4} lg={2} xl={2}>
            <Typography variant="p" className="title">
              RESOURCES
            </Typography>
            <Typography variant="p" className="subtitle">
              <Link href="https://about.algodex.com/disclaimers/" target="_blanc">
                Disclaimers
              </Link>
            </Typography>
            <Typography variant="p" className="subtitle">
              <Link href="https://about.algodex.com/blog/" target="_blanc">
                Blog
              </Link>
            </Typography>
            <Typography variant="p" className="subtitle">
              <Link href="https://about.algodex.com/docs/" target="_blanc">
                Docs
              </Link>
            </Typography>
            <Typography variant="p" className="subtitle">
              <Link href="https://about.algodex.com/support/" target="_blanc">
                Support
              </Link>
            </Typography>
            <Typography variant="p" className="subtitle">
              <Link href="https://github.com/algodex/algodex-public-documents/blob/master/Algodex%20Whitepaper%201.0.pdf" target="_blanc">
                White Paper
              </Link>
            </Typography>
            <Typography variant="p" className="subtitle">
              <Link href="https://github.com/algodex/algodex-public-documents/blob/master/Algodex%20Tokenomics.pdf" target="_blanc">
                Tokenomics
              </Link>
            </Typography>
          </Grid>
          <Grid item sm={4} md={4} lg={2} xl={2}>
            <Typography variant="p" className="title">
              COMPANY
            </Typography>
            <Typography variant="p" className="subtitle">
              <Link href="https://about.algodex.com/" target="_blanc">
                About
              </Link>
            </Typography>
            <Typography variant="p" className="subtitle">
              Careers
            </Typography>
            <Typography variant="p" className="subtitle">
              Partnerships
            </Typography>
          </Grid>
          <Grid item sm={4} md={4} lg={2} xl={2}>
            <Typography variant="p" className="title">
              COMMUNITY
            </Typography>
            <Typography variant="p" className="subtitle">
              <Link
                href="https://twitter.com/AlgodexOfficial?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                target="_blanc"
              >
                Twitter
              </Link>
            </Typography>
            <Typography variant="p" className="subtitle">
              <Link href="https://discord.gg/qS3Q7AqwF6" target="_blanc">
                Discord
              </Link>
            </Typography>
            <Typography variant="p" className="subtitle">
              <Link href="https://www.reddit.com/r/algodex" target="_blanc">
                Reddit
              </Link>
            </Typography>
            <Typography variant="p" className="subtitle">
              <Link href="https://t.me/algodex" target="_blanc">
                Telegram
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}
