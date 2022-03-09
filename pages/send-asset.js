import React, {useState} from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

// MUI Components
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Custom Components
import SendAssetForm from '@/components/SendAssetForm'
import Link from '@/components/Nav/Link'
import { defaults } from 'next-i18next.config'
import { useTranslation } from 'next-i18next'
import useMailbox from '@/hooks/useMailbox'
import Paper from '@mui/material/Paper'

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
  // Page State
  const [loading, setLoading] = useState(false)
  const [actionStatus, setActionStatus] = useState({
    message: '',
    success: false,
  })


  // Custom Hooks
  const { t } = useTranslation('common')
  const {mailbox, isConnected} = useMailbox()

  const submitForm = async ({ formData }) => {
    const { wallet, assetId, csvTransactions } = formData
    console.log('SUBMIITING', { formData })
    setLoading(true)
    const responseData = await mailbox.send(
      {asset: {id: assetId}, from:{address: wallet}, to: csvTransactions}
    )
    setLoading(false)
    if (responseData.error === false) {
      const totalAssets = responseData.confirmedTransactions.length
      const sentAssets = responseData.confirmedTransactions.filter(
        (asset) => asset.value.status === 'confirmed'
      ).length
      setActionStatus({
        message: `${sentAssets}/${totalAssets} transaction(s) sent successfully`,
        success: true,
      })
    } else {
      setActionStatus({
        message: responseData.body?.message || 'Sorry an error occured',
        success: false,
      })
    }
  }
  return (
    <>
      <Head>
        <title>{`${t('/send-asset')} | ${t('app-title')}`}</title>
      </Head>

      <Container maxWidth="md" sx={{ my: 4 }}>
        <Paper sx={{p:4}}>
          <SendAssetForm
            isDisabled={!isConnected}
            // onError={(e, v)=>console.error(e, v)}
            // onChange={(e, v)=>console.log(e, v)}
            onSubmit={submitForm}
            isLoading={loading}
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
          <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
            <Grid item xs={6} lg={5} className="mr-2">
              <Link href={'/instructions'}>
                {t('view-instructions-link')}
              </Link>
            </Grid>
            <Grid item xs={6} lg={5}>
              <Link href={'/downloadlink'}>
                {t('download-csv-example-link')}
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>

    </>
  )
}

export default SendAssetPage
