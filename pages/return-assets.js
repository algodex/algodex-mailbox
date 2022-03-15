import React, { useCallback, useState } from 'react'
import { defaults } from 'next-i18next.config'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

// MUI Components
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

// Custom Components
import Link from '@/components/Nav/Link'
import ReturnAssetForm from '@/components/ReturnAssetForm'
import * as ReturnAssetHelper from '@/lib/return_assets.js'
import useMyAlgo from '@/hooks/use-my-algo'

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
export function ReturnAssetPage() {
  const [loading, setLoading] = useState(false)
  const [senderAddress, setSenderAddress] = useState('')
  const [actionStatus, setActionStatus] = useState({
    message: '',
    success: false,
  })

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

  const { t } = useTranslation('common')

  const submitForm = async ({ formData }) => {
    const { assetId, csvTransactions } = formData
    setLoading(true)
    setActionStatus({
      message: '',
      success: false,
    })
    if (senderAddress != '' && assetId != '' && csvTransactions != '') {
      const responseData = await ReturnAssetHelper.returnAssetsToSender(
        assetId,
        senderAddress,
        csvTransactions
      )
      // console.log('responseData', responseData)
      setLoading(false)
      if (responseData?.error == false) {
        const totalAssets = responseData.confirmedTransactions.length
        const sentAssets = responseData.confirmedTransactions.filter(
          (asset) => asset.value.status == 'confirmed'
        ).length
        setActionStatus({
          message: `${sentAssets}/${totalAssets} transaction(s) returned successfully`,
          success: true,
        })
      } else {
        setActionStatus({
          message: responseData.body?.message || 'Sorry, an error occurred',
          success: false,
        })
      }
    }
  }
  return (
    <>
      <Head>
        <title>{`${t('/return-assets')} | ${t('app-title')}`}</title>
      </Head>
      <Container sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={6} xl={5}>
            <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
              {t('/return-assets')}
            </Typography>
            <Button variant="contained" onClick={connect}>
              {t('connect-wallet')}
            </Button>
            <ReturnAssetForm
              formattedAddresses={formattedAddresses}
              onSubmit={submitForm}
              isLoading={loading}
              setSenderAddress={setSenderAddress}
            />
            {actionStatus.message != '' && (
              <Typography
                variant="error-message"
                marginTop="-1.6rem"
                sx={{ display: 'flex', justifyContent: 'end' }}
                color={actionStatus.success ? 'green' : 'error'}
              >
                {actionStatus.message}
              </Typography>
            )}
            <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
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

export default ReturnAssetPage
