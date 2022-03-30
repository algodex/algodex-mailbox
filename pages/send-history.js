/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, { useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { defaults } from '@/next-i18next.config'

// MUI Components
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Custom Components
import SendHistoryForm from '@/components/SendHistoryForm'
import * as SendHistoryHelper from '@/lib/send_history'

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
  const { t } = useTranslation('common')
  const [formData, setFormData] = useState({
    assetId: '',
    senderAddress: '',
    csvTransactions: '',
  })
  const [loading, setLoading] = useState(false)
  const [actionStatus, setActionStatus] = useState({
    message: '',
    success: false,
  })
  const [csvLink, setCsvLink] = useState()

  const updateStatusMessage = (message, status) => {
    setActionStatus({
      message: message || '',
      success: status || false,
    })
  }

  const submitForm = async ({ formData }) => {
    const { senderAddress, assetId } = formData
    if (senderAddress != '' && assetId != '') {
      setLoading(true)
      setCsvLink()
      updateStatusMessage()
      setFormData({
        assetId,
        senderAddress,
        csvTransactions: '',
      })
      const responseData = await SendHistoryHelper.getSendHistory(
        assetId.trim(),
        senderAddress.trim()
      )
      // console.debug('responseData', responseData)
      setLoading(false)
      if (responseData.error == true) {
        updateStatusMessage(
          responseData.body?.message || 'Sorry an error occured'
        )
      } else {
        setFormData({
          assetId,
          senderAddress,
          csvTransactions: responseData,
        })
        setCsvLink('data:text/csv;charset=utf-8,' + encodeURI(responseData))
      }
    }
  }

  return (
    <>
      <Head>
        <title>{`${t('/send-history')} | ${t('app-title')}`}</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={6} xl={5}>
          <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
            {t('/send-history')}
          </Typography>
          <SendHistoryForm
            onSubmit={submitForm}
            isLoading={loading}
            formData={formData}
            actionStatus={actionStatus}
            csvLink={csvLink}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default SendHistoryPage
