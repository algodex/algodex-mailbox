import React, { useCallback, useState } from 'react'
import { defaults } from 'next-i18next.config'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

// MUI Components
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
  const [assetId, setAssetId] = useState('')
  const [csvTransactions, setCsvTransactions] = useState()
  const [fileName, setFileName] = useState()
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
      // console.debug({ addresses })
      setFormattedAddresses(addresses)
    },
    [setFormattedAddresses]
  )

  const { connect } = useMyAlgo(updateAddresses)

  const { t } = useTranslation('common')

  const submitForm = async ({ formData }) => {
    console.debug(formData)
    if (senderAddress != '' && assetId != '' && csvTransactions != '') {
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
      // console.debug('responseData', responseData)
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

  const getFileUpload = async (e) => {
    setActionStatus({
      message: '',
      success: false,
    })
    const csvFiles = e.target.files[0]
    setFileName(csvFiles.name)
    const reader = new FileReader()
    reader.onloadend = ({ target }) => {
      const text = target.result
      setCsvTransactions(text.replace(/\r?\r/g, ''))
    }
    reader.readAsText(csvFiles)
  }

  return (
    <>
      <Head>
        <title>{`${t('/return-assets')} | ${t('app-title')}`}</title>
      </Head>
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
            actionStatus={actionStatus}
            isLoading={loading}
            setSenderAddress={setSenderAddress}
            setAssetId={setAssetId}
            csvTransactions={csvTransactions}
            getFileUpload={getFileUpload}
            fileName={fileName}
          />

          <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
            <Grid item xs={6} lg={5} className="mr-2">
              <Link
                href="https://about.algodex.com/docs/algodex-mailbox-user-guide/"
                target="blanc"
                color="primary.dark"
              >
                {t('view-instructions-link')}
              </Link>
            </Grid>
            <Grid item xs={6} lg={5}>
              <Link href={'/sample.csv'} download color="primary.dark">
                {t('download-csv-example-link')}
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ReturnAssetPage
