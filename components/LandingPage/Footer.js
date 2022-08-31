/* eslint-disable max-len */
import React from 'react'
import Image from 'next/image'
import Link from '../Nav/Link'
import { useTranslation } from 'next-i18next'

// MUI Components
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
// import Button from '@mui/material/Button'
// import MailOutlineIcon from '@mui/icons-material/MailOutline'

const styles = {
  footerWrapper: {
    backgroundColor: 'secondary.main',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    flexWrap: 'wrap',
    '& .icon': {
      position: 'absolute',
      left: '0.5rem',
      top: '0.5rem',
    },
    '& input': {
      height: '2.3rem',
      marginRight: '1rem',
      flex: '1',
      paddingLeft: '2rem',
      backgroundColor: '#cbd5e0',
      border: '1px solid',
      borderColor: 'secondary.contrastText',
      borderRadius: '0.19rem',
    },
  },
  title: {
    fontSize: '1.25rem',
    marginBottom: '1rem',
    fontWeight: '700',
    color: 'accent.light',
  },
  subtitle: {
    fontWeight: '500',
    color: 'accent.light',
    marginBottom: '0.5rem',
    '& a': {
      color: 'accent.light',
      cursor: 'pointer',
      textDecoration: 'none',
    },
  },
}

const FooterLinks = ({ link, linkName }) => {
  return (
    <Typography variant="p" sx={styles.subtitle}>
      <Link href={link} target="_blanc">
        {linkName}
      </Link>
    </Typography>
  )
}
export const LandingPageFooter = () => {
  const { t } = useTranslation('common')
  return (
    <Box sx={styles.footerWrapper}>
      <Container>
        {/* <Grid container spacing={4} sx={{paddingTop:'1.8rem'}}>
          <Grid item md={6} lg={6} xl={5}>
            <Typography
              variant="p"
              fontWeight={700}
              marginBottom="2rem"
              sx={{
                color: (theme) => theme.palette.accent.light,
              }}
            >
              {t('Stay up to date with info on Algodex updates, new features, and
              releases by joining our mailing list.')}
            </Typography>
            <Box sx={styles.inputContainer}>
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
            </Box>
          </Grid>
        </Grid> */}

        <Grid container spacing={4} sx={{ marginBottom: '2rem' }}>
          <Grid item md={11} lg={10} xl={9} marginX="auto">
            <Divider
              sx={{
                backgroundColor: 'accent.light',
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ paddingBottom: '2rem' }}>
          <Grid item sm={10} md={10} lg={5} xl={5}>
            <Image
              src="/Algodex-Logo White.png"
              alt="Algodex logo"
              height={48}
              width={300}
            />
            <Typography variant="p" marginTop="1rem" sx={styles.title}>
              {t('decentralized-marketplace-on-Algorand')}
            </Typography>
          </Grid>
          <Grid item sm={4} md={4} lg={2} xl={2}>
            <Typography variant="p" sx={styles.title}>
              {t('RESOURCES')}
            </Typography>

            <FooterLinks
              link="https://docs.algodex.com/algodex-mailbox"
              linkName={t('docs')}
            />
            <FooterLinks
              link="https://github.com/algodex/algodex-mailbox"
              linkName={'Github'}
            />
            <FooterLinks
              link="https://app.algodex.com/support/"
              linkName={t('support')}
            />

            <FooterLinks
              link="https://github.com/algodex/algodex-public-documents/blob/master/Algodex%20Whitepaper%201.0.pdf"
              linkName={t('white-paper')}
            />
            <FooterLinks
              link="https://github.com/algodex/algodex-public-documents/blob/master/Algodex%20Tokenomics.pdf"
              linkName={t('tokenomics')}
            />
          </Grid>
          <Grid item sm={4} md={4} lg={2} xl={2}>
            <Typography variant="p" sx={styles.title}>
              {t('COMPANY')}
            </Typography>
            <FooterLinks
              link="https://app.algodex.com/about"
              linkName={t('about')}
            />
            <FooterLinks
              link="https://about.algodex.com/blog/"
              linkName={t('blog')}
            />
          </Grid>
          <Grid item sm={4} md={4} lg={2} xl={2}>
            <Typography variant="p" sx={styles.title}>
              {t('COMMUNITY')}
            </Typography>

            <FooterLinks
              link="https://twitter.com/AlgodexOfficial?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
              linkName={'Twitter'}
            />
            <FooterLinks
              link="https://discord.gg/qS3Q7AqwF6"
              linkName={'Discord'}
            />
            <FooterLinks
              link="https://www.reddit.com/r/algodex"
              linkName={'Reddit'}
            />
            <FooterLinks link="https://t.me/algodex" linkName={'Telegram'} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
