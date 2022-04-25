import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { defaults } from 'next-i18next.config'
import { Hero } from '@/components/LandingPage/Hero'
import { UserGuide } from '@/components/LandingPage/UserGuide'
import { FAQ } from '@/components/LandingPage/FAQ'
import { LandingPageFooter } from '@/components/LandingPage/Footer'
import Box from '@mui/material/Box'

/**
 * Generate Static Properties
 * @param locale
 */
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [...defaults])),
    },
  }
}

/**
 * Send Asset Page
 * @returns {JSX.Element}
 * @constructor
 */

const LandingPage = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <Head>
        <title>{`${t('app-title')}`}</title>
      </Head>
      <Box
        sx={{
          overflow: 'auto',
          height: '100vh',
          maxHeight: '-webkit-fill-available',
          backgroundColor: 'accent.dark',
        }}
      >
        <Hero />
        <UserGuide />
        <FAQ />
        <LandingPageFooter />
      </Box>
    </>
  )
}

export default LandingPage
