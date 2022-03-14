import React, { useState } from 'react'
import { defaults } from 'next-i18next.config'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

// MUI Components
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Custom Components
import Link from '@/components/Nav/Link'
import ReturnAssetForm from '@/components/ReturnAssetForm'
import * as ReturnAssetHelper from '@/lib/return_assets.js'

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
  const [actionStatus, setActionStatus] = useState({
    message: '',
    success: false,
  })
  
  const { t } = useTranslation('common')

  const submitForm = async ({ formData }) => {
    const {assetId, senderAddress, csvTransactions} = formData
    console.log(assetId, senderAddress, csvTransactions)
    setLoading(true)
    setActionStatus({
      message: '',
      success: false,
    })
    const responseData = await ReturnAssetHelper.returnAssetsToSender(
      assetId,
      senderAddress,
      csvTransactions
    )
    console.log('responseData', responseData)
    setLoading(false)
    if (responseData?.error == false) {
      const totalAssets = responseData.confirmedTransactions.length
      const sentAssets = responseData.confirmedTransactions.filter(
        (asset) => asset.value.status == 'confirmed'
      ).length
      setActionStatus({
        message: `${sentAssets}/${totalAssets} transaction(s) sent successfully`,
        success: true,
      })
    } else {
      setActionStatus({
        message: responseData.body?.message || 'Sorry, an error occurred',
        success: false,
      })
    }
  }
  return (
    <>
      <Head>
        <title>{`${t('/return-asset')} | ${t('app-title')}`}</title>
      </Head>
      <Container sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={6} xl={5}>
            <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
              {t('/return-asset')}
            </Typography>
            
            <ReturnAssetForm
              onSubmit={submitForm}
              isLoading={loading}
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
