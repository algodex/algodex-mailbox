import React, { useCallback, useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

// MUI Components
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

// Custom Components
import * as SendAssetsHelper from '@/lib/send_assets.js'
import SendAssetForm from '@/components/SendAssetForm'
import Link from '@/components/Nav/Link'
import useMyAlgo from '@/hooks/use-my-algo'
import { defaults } from 'next-i18next.config'
import { useTranslation } from 'next-i18next'
import Helper from '@/lib/helper'

/**
 * Generate Static Properties
 * @param locale
 */
export async function getStaticProps({ locale }) {
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
export function SendAssetPage() {
  const [loading, setLoading] = useState(false)
  const [assetId, setAssetId] = useState()
  const [wallet, setWallet] = useState()
  const [assetBalance, setAssetBalance] = useState({
    success: false,
    message: '',
  })
  const [actionStatus, setActionStatus] = useState({
    message: '',
    success: false,
  })
  const { t } = useTranslation('common')
  const [formattedAddresses, setFormattedAddresses] = useState([])

  const updateAddresses = useCallback(
    (addresses) => {
      if (addresses == null) {
        return
      }
      // console.log({ addresses })
      setFormattedAddresses(addresses)
    },
    [setFormattedAddresses]
  )

  const { connect } = useMyAlgo(updateAddresses)
  const submitForm = async ({ formData }) => {
    const { wallet, assetId, csvTransactions } = formData
    setLoading(true)
    setActionStatus({
      message: '',
      success: false,
    })
    const responseData = await SendAssetsHelper.send(
      assetId,
      wallet,
      csvTransactions
    )
    // console.log('responseData', responseData)
    setLoading(false)
    if (responseData.error == false) {
      const totalAssets = responseData.confirmedTransactions.length
      const sentAssets = responseData.confirmedTransactions.filter(
        (asset) => asset.value.status == 'confirmed'
      ).length
      setActionStatus({
        message: `${sentAssets}/${totalAssets} transaction(s) sent successfully`,
        success: true,
      })
      getAssetBalance({ wallet, assetId })
    } else {
      setActionStatus({
        message: responseData.body?.message || 'Sorry, an error occurred',
        success: false,
      })
    }
  }

  useEffect(() => {
    if (wallet && assetId) {
      getAssetBalance({ wallet, assetId })
    }
  }, [assetId, wallet])

  const getAssetBalance = async ({ wallet, assetId }) => {
    const responseData = await Helper.getFormattedAssetBalance(
      wallet,
      assetId,
      true
    )

    // console.log('responseData', responseData)
    if (responseData && responseData.error == false) {
      setAssetBalance({ success: true, message: responseData.balance })
    } else {
      setAssetBalance({
        success: false,
        message:
          responseData?.data?.message ||
          // eslint-disable-next-line max-len
          'An error occurred while getting your asset balance, please ensure you enter a valid asset id',
      })
    }
  }

  return (
    <>
      <Head>
        <title>{`${t('/send-asset')} | ${t('app-title')}`}</title>
      </Head>
      <Container sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={6} xl={5}>
            <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
              {t('/send-asset')}
            </Typography>
            <Button variant="contained" onClick={connect}>
              {t('connect-wallet')}
            </Button>
            {assetBalance.message != '' && (
              <Typography
                variant="error-message"
                display="block"
                marginTop="1rem"
                color={assetBalance.success ? 'green' : 'error'}
              >
                {assetBalance.message} {assetBalance.success ? 'available' : ''}
              </Typography>
            )}
            <SendAssetForm
              formattedAddresses={formattedAddresses}
              onSubmit={submitForm}
              isLoading={loading}
              setWallet={setWallet}
              setAssetId={setAssetId}
            />
            {actionStatus.message != '' && (
              <Typography
                variant="error-message"
                sx={{ display: 'flex', justifyContent: 'end' }}
                color={actionStatus.success ? 'green' : 'error'}
              >
                {actionStatus.message}
              </Typography>
            )}
            <Grid container spacing={2} sx={{ marginBlock: '2rem' }}>
              <Grid item xs={6} lg={5} className="mr-2">
                <Link href={'/instructions'} color="primary.dark">
                  {t('view-instructions-link')}
                </Link>
              </Grid>
              <Grid item xs={6} lg={5}>
                <Link href={'/downloadlink'} color="primary.dark">
                  {t('download-csv-example-link')}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default SendAssetPage
