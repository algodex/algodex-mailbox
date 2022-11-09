/* 
 * Algodex Mailbox 
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
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

// Custom Components
import TransactionHistoryForm from '@/components/TransactionHistoryForm'
import * as TransactionHistoryHelper from '@/lib/transaction_history'
import Link from '@/components/Nav/Link'
import TransactionTable from '@/components/TransactionTable'

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

  const updateStatusMessage = (message, status) => {
    setActionStatus({
      message: message || '',
      success: status || false,
    })
  }

  const submitForm = async ({ formData }) => {
    const { senderAddress, assetId } = formData
    if (senderAddress != '' && assetId != '') {
      setCsvLink()
      updateStatusMessage()
      setFormData({
        assetId,
        senderAddress,
        csvTransactions: '',
      })
      if (assetId && senderAddress) {
        setLoading(true)
        setTableRows([])
        const responseData =
          await TransactionHistoryHelper.getTransactionHistory(
            assetId.trim(),
            senderAddress.trim()
          )
        // console.debug('responseData', responseData)
        setLoading(false)
        if (responseData instanceof Error || responseData.error == true) {
          updateStatusMessage(
            responseData.body?.message || 'Sorry an error occured'
          )
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
    // console.debug({ rows })
    if (rows[0] == '') {
      setActionStatus({
        message: 'No transaction history to display',
        success: false,
      })
    } else {
      setCsvLink('data:text/csv;charset=utf-8,' + encodeURI(csv))
      let formattedRows = rows.map((v) => {
        if (v) {
          const values = v.split(',')
          const storeKeyValue = titles.reduce((obj, title, index) => {
            obj[title] = values[index]
            return obj
          }, {})
          return storeKeyValue
        }
      })
      const finalRows = formattedRows.filter((r) => r != undefined)
      setTableRows(finalRows)
    }
  }
  return (
    <Container sx={{ margin: 4 }}>
      <Head>
        <title>{`${t('/transaction-history')} | ${t('app-title')}`}</title>
      </Head>
      <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
        {t('/transaction-history')}
      </Typography>

      <Typography
        variant="p"
        sx={{ marginBottom: '1rem', color: 'info.error' }}
      >
      </Typography>
      <TransactionHistoryForm
        onSubmit={submitForm}
        isLoading={loading}
        formData={formData}
        actionStatus={actionStatus}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={11} xl={10} marginBottom="2rem">
          {tableRows.length > 0 && (
            <Box sx={{ marginBlock: '1rem' }} data-testid="transaction-table">
              <TransactionTable rows={tableRows} />
            </Box>
          )}
          {csvLink && (
            <Link
              href={csvLink}
              target="_blanc"
              download="Transaction History.csv"
              sx={{ color: 'info.main', textDecoration: 'underline' }}
            >
              Click to download Transaction History
            </Link>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default TransactionHistoryPage
