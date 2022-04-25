/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, { useEffect, useState } from 'react'
import { defaults } from '@/next-i18next.config'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

// MUI Components
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

// Custom Components
import RedeemAssetForm from '@/components/RedeemAssetForm'
import Link from '@/components/Nav/Link'
import Helper from '@/lib/helper.js'
import RedeemAssetsHelper from '@/lib/redeem_assets.js'

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

/**
 * Redeem Asset page
 * @returns {JSX.Element}
 * @constructor
 */
export function RedeemAssetPage() {
  const { t } = useTranslation('common')
  const [loading, setLoading] = useState(false)
  const [escrowBalance, setEscrowBalance] = useState({
    success: false,
    message: '',
    algoExplorerLink: '',
  })
  const { query } = useRouter()
  const [assetId, setAssetId] = useState()
  const [receiverAddress, setReceiverAddress] = useState()
  const [senderAddress, setSenderAddress] = useState()
  const [optInStatus, setOptInStatus] = useState()
  const [actionStatus, setActionStatus] = useState({
    message: '',
    success: false,
  })
  const [gettingBalance, setGettingBalance] = useState(false)
  const formData = {
    assetId: query.assetId || '',
    senderAddress: query.senderAddress || '',
    receiverAddress: query.receiverAddress || '',
  }

  useEffect(() => {
    setAssetId(query.assetId)
    setSenderAddress(query.senderAddress)
    setReceiverAddress(query.receiverAddress)
  }, [query])

  const updateStatusMessage = (message, status) => {
    setActionStatus({
      message: message || '',
      success: status || false,
    })
  }

  const submitForm = async () => {
    updateStatusMessage()
    setLoading(true)
    // console.debug(assetId, receiverAddress, senderAddress)
    const responseData = await RedeemAssetsHelper.redeem(
      assetId,
      receiverAddress,
      senderAddress
    )
    setLoading(false)
    if (responseData.status == 'confirmed') {
      updateStatusMessage(responseData.statusMsg, true)

      getBalance()
    } else {
      updateStatusMessage(
        typeof responseData === 'string'
          ? responseData
          : responseData?.response?.body?.message ||
              t('Sorry, an error occurred'),
        false
      )
    }
  }

  const getBalance = async () => {
    setGettingBalance(true)
    const res = await RedeemAssetsHelper.getEscrowBalance(
      parseInt(assetId),
      receiverAddress,
      senderAddress
    )
    console.debug({ res })
    setGettingBalance(false)
    if (res.error == false) {
      setEscrowBalance({
        success: true,
        message: res.balance,
        algoExplorerLink: res.algoExplorerLink,
      })
    } else {
      setEscrowBalance({
        success: false,
        message:
          res?.data?.message ||
          // eslint-disable-next-line max-len
          'An error occurred while getting your asset balance, please ensure you enter valid inputs',
        algoExplorerLink: '',
      })
    }
  }

  const checkOptIn = async () => {
    try {
      const res = await Helper.checkOptIn(receiverAddress, parseInt(assetId))
      // console.debug(res)
      setOptInStatus(res)
    } catch (error) {
      console.debug(error)
    }
  }

  useEffect(() => {
    if (assetId && receiverAddress && senderAddress) {
      getBalance()
    }

    if (assetId && receiverAddress) {
      checkOptIn()
    }

    if (
      actionStatus.message != '' ||
      optInStatus != undefined ||
      escrowBalance.message != ''
    ) {
      updateStatusMessage()
      setOptInStatus()
      setEscrowBalance({
        message: '',
        success: true,
        algoExplorerLink: '',
      })
    }
  }, [assetId, receiverAddress, senderAddress])

  return (
    <>
      <Head>
        <title>{`${t('/redeem-assets')} | ${t('app-title')}`}</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={7} xl={6}>
          <Typography variant="h5">{t('/redeem-assets')}</Typography>
          <RedeemAssetForm
            onSubmit={submitForm}
            actionStatus={actionStatus}
            loading={loading}
            setSenderAddress={setSenderAddress}
            setReceiverAddress={setReceiverAddress}
            setAssetId={setAssetId}
            senderAddress={senderAddress}
            receiverAddress={receiverAddress}
            assetId={assetId}
            optInStatus={optInStatus}
            formData={formData}
            balance={parseFloat(escrowBalance.message)}
          />
          <Grid container spacing={7} sx={{ marginBottom: '2rem' }}>
            <Grid item>
              <Typography variant="p" component="p">
                {t('escrow-balance')}:
              </Typography>
            </Grid>
            <Grid item>
              {gettingBalance ? (
                <CircularProgress color="primary" size={15} />
              ) : (
                <>
                  {escrowBalance.message && escrowBalance.message != '' && (
                    <Typography
                      variant="error-message"
                      marginTop="1rem"
                      color={escrowBalance.success ? 'green' : 'error'}
                    >
                      {escrowBalance.message}{' '}
                      {escrowBalance.success && 'available'}
                    </Typography>
                  )}
                </>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
            <Grid item xs={6} lg={5}>
              <Link
                href="https://about.algodex.com/docs/algodex-mailbox-user-guide/"
                target="blanc"
                color="primary.dark"
              >
                {t('view-instructions-link')}
              </Link>
            </Grid>
            {escrowBalance.algoExplorerLink != '' && (
              <Grid item xs={6} lg={5}>
                <Link
                  href={escrowBalance.algoExplorerLink}
                  color="primary.dark"
                  target="_blanc"
                >
                  {t('open-algoexplorer-link')}
                </Link>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
          <Grid item xs={6} lg={5}>
            <Link
              href="https://about.algodex.com/docs/algodex-mailbox-user-guide/"
              target="blanc"
              color="primary.dark"
            >
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
    </>
  )
}

export default RedeemAssetPage
