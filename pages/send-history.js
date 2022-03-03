import React from 'react'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {useTranslation} from 'next-i18next'
import Head from 'next/head'
import {defaults} from '@/next-i18next.config'

// MUI Components
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Custom Components
import SendHistoryForm from '@/components/SendHistoryForm'

/**
 * Generate Static Properties
 * @param locale
 */
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        [...defaults, 'send-history-page']
      )),
    },
  }
}

export function SendHistoryPage(){
  const{t} = useTranslation('common')
  const submitForm = async ({ formData }) => {
    console.log(formData)
    window.alert('Form Submitted, check console for the log of your values')
  }
  return (
    <>
      <Head>
        <title>{`${t('/send-history')} | ${t('app-title')}`}</title>
      </Head>
      <Container sx={{my:4}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={6} xl={5}>
            <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
              {t('/send-history')}
            </Typography>
            <SendHistoryForm onSubmit={submitForm} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default SendHistoryPage
