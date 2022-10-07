/* 
 * Algodex Service 
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
          width: '100%',
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
