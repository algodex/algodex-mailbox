import React, { useState } from 'react'
import { defaults } from '@/next-i18next.config'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// MUI Components
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'

// Custom Components
import RedeemAssetForm from '@/components/RedeemAssetForm'
import Link from '@/components/Nav/Link'
const RedeemAssetsHelper = require('../lib/redeem_assets.js')

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
 * Redeem Asset page
 * @returns {JSX.Element}
 * @constructor
 */
export function RedeemAssetPage() {
  const { t } = useTranslation('common')
  const [loading, setLoading] = useState(false)
  const [escrowBalance, setEscrowBalance] = useState('')
  const [actionStatus, setActionStatus] = useState({
    message: '',
    success: false,
  })

  const submitForm = async ({
    formData: { assetId, receiverAddress, senderAddress },
  }) => {
    setActionStatus({
      message: '',
      success: '',
    })
    setLoading(true)
    const responseData = await RedeemAssetsHelper.redeem(
      assetId,
      receiverAddress,
      senderAddress
    )
    setLoading(false)
    // console.log('responseData', responseData)
    // console.log('responseData', responseData?.response)
    if (responseData.status == 'confirmed') {
      setActionStatus({
        message: responseData.statusMsg,
        success: true,
      })
      const res = await RedeemAssetsHelper.getEscrowBalance(
        assetId,
        receiverAddress,
        senderAddress
      )
      setEscrowBalance(res)
    } else {
      setActionStatus({
        message:
          typeof responseData === 'string'
            ? responseData
            : responseData?.response?.body?.message ||
              'Sorry, an error occurred',
        success: false,
      })
    }
  }

  return (
    <>
      <Head>
        <title>{`${t('/redeem-asset')} | ${t('app-title')}`}</title>
      </Head>
      <Container sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={6} xl={5}>
            <Typography variant="h5">{t('/redeem-asset')}</Typography>
            <RedeemAssetForm
              onSubmit={submitForm}
              actionStatus={actionStatus}
              loading={loading}
            />
            {escrowBalance && (
              <Grid container spacing={7} sx={{ marginBottom: '2rem' }}>
                <Grid item>
                  <Typography variant="p" component="p">
                    {t('balance')}:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="p" component="p">
                    {escrowBalance}
                  </Typography>
                </Grid>
              </Grid>
            )}

            <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
              <Grid item xs={6} lg={5}>
                <Link href={'/instructions'} color="primary.dark">
                  {t('view-instructions-link')}
                </Link>
              </Grid>
              <Grid item xs={6} lg={5}>
                <Link href={'/'} color="primary.dark">
                  {t('open-algoexplorer-link')}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default RedeemAssetPage
