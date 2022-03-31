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
import TransactionHistoryForm from '@/components/TransactionHistoryForm'
import * as TransactionHistoryHelper from '@/lib/transaction_history'

/**
 * Generate Static Properties
 * @param locale
 */
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        ...defaults,
        'transaction-history-page',
      ])),
    },
  }
}

export function TransactionHistoryPage() {
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
  const [tableRows, setTableRows] = useState([])

  const submitForm = async ({ formData }) => {
    const { senderAddress, assetId } = formData
    if (senderAddress != '' && assetId != '') {
      setLoading(true)
      setCsvLink()
      setActionStatus({
        message: '',
        success: true,
      })
      setFormData({
        assetId,
        senderAddress,
        csvTransactions: '',
      })
      if (assetId && senderAddress) {
        const responseData =
          await TransactionHistoryHelper.getTransactionHistory(
            assetId.trim(),
            senderAddress.trim()
          )
        // console.debug('responseData', responseData)
        setLoading(false)
        if (responseData.error == true) {
          setActionStatus({
            message: responseData.body?.message || 'Sorry an error occured',
            success: false,
          })
        } else {
          setFormData({
            assetId,
            senderAddress,
            csvTransactions: responseData,
          })
          updateCSVTable(responseData)
        }
      }
    }
  }

  const updateCSVTable = (csv) => {
    const titles = csv.slice(0, csv.indexOf('\n')).split(',')
    const rows = csv.slice(csv.indexOf('\n') + 1).split('\n')
    console.log({ rows })
    if (rows[0] == '') {
      setActionStatus({
        message: 'No transaction history to display',
        success: false,
      })
    } else {
      setCsvLink('data:text/csv;charset=utf-8,' + encodeURI(csv))
      let formattedRows = rows.map((v) => {
        console.log({ v })
        if (v != '') {
          const values = v.split(',')
          const storeKeyValue = titles.reduce((obj, title, index) => {
            obj[title] = values[index]
            return obj
          }, {})
          return storeKeyValue
        }
      })
      console.log({ formattedRows })
      setTableRows(formattedRows)
    }
  }
  return (
    <>
      <Head>
        <title>{`${t('/transaction-history')} | ${t('app-title')}`}</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={6} xl={5}>
          <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
            {t('/transaction-history')}
          </Typography>
          <TransactionHistoryForm
            onSubmit={submitForm}
            isLoading={loading}
            formData={formData}
            actionStatus={actionStatus}
            csvLink={csvLink}
            tableRows={tableRows}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default TransactionHistoryPage
