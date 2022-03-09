import React, { useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { defaults } from '@/next-i18next.config'

// MUI Components
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Custom Components
import SendHistoryForm from '@/components/SendHistoryForm'
import useMailbox from '@/hooks/useMailbox'
import Mailbox from '@/lib/Mailbox'

/**
 * Generate Static Properties
 * @param locale
 */
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        ...defaults,
        'send-history-page',
      ])),
    },
  }
}

export function SendHistoryPage() {
  const mailbox = useMailbox()
  console.log(mailbox)
  const { t } = useTranslation('common')
  const [formData /*, setFormData*/] = useState({
    assetId: '',
    senderAddress: '',
    csvTransactions: '',
  })
  const [loading, setLoading] = useState(false)
  const [actionStatus, setActionStatus] = useState({
    message: '',
    success: false,
  })

  const submitForm = async ({ formData }) => {
    const { senderAddress, assetId } = formData
    // console.log({ formData })
    setLoading(true)
    setActionStatus({
      message: '',
      success: true,
    })
    const responseData = await Mailbox.getHistory(
      assetId,
      senderAddress,
      mailbox.config
    )
    console.log(responseData)
    // // console.log('responseData', responseData)
    // setLoading(false)
    // if (responseData.error == true) {
    //   setActionStatus({
    //     message: responseData.body?.message || 'Sorry an error occured',
    //     success: false,
    //   })
    // } else {
    //   setFormData({
    //     assetId,
    //     senderAddress,
    //     csvTransactions: responseData,
    //   })
    // }
  }
  return (
    <>
      <Head>
        <title>{`${t('/send-history')} | ${t('app-title')}`}</title>
      </Head>
      <Container sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={6} xl={5}>
            <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
              {t('/send-history')}
            </Typography>
            <SendHistoryForm
              onSubmit={submitForm}
              isLoading={loading}
              formData={formData}
            />
            {actionStatus.message !== '' && (
              <Typography
                variant="error-message"
                sx={{ display: 'flex', justifyContent: 'end' }}
                color={actionStatus.success ? 'green' : 'error'}
              >
                {actionStatus.message}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default SendHistoryPage
