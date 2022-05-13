/* eslint-disable max-len */
/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, { useEffect, useMemo, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

// MUI Components
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Container from '@mui/material/Container'

// Custom Components
import SendAssetForm from '@/components/SendAssetForm'
import Link from '@/components/Nav/Link'
import { defaults } from 'next-i18next.config'
import { useTranslation } from 'next-i18next'
import Helper from '@/lib/helper'
import useSendAsset from '@/hooks/useSendAsset'
import useFormattedAddress from '@/hooks/useFormattedAddress'

// Library Files
import SendAssets from '@/lib/send_assets'
import { LinearProgressWithLabel } from '@/components/LinearProgressWithLabel'

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
 * Send Asset Page
 * @returns {JSX.Element}
 * @constructor
 */
export function SendAssetPage() {
  const { formattedAddresses, connect } = useFormattedAddress()
  const { progress, status, total, hideProgress, setHideProgress, setStatus } =
    useSendAsset()
  const [loading, setLoading] = useState(false)
  const [assetId, setAssetId] = useState()
  const [wallet, setWallet] = useState()
  const [escrowPermission, setEscrowPermission] = useState(true)
  const [csvTransactions, setCsvTransactions] = useState()
  const [assetBalance, setAssetBalance] = useState({
    success: false,
    message: '',
  })
  const [actionStatus, setActionStatus] = useState({
    message: '',
    success: false,
  })
  const { t } = useTranslation('common')
  const [gettingBalance, setGettingBalance] = useState(false)
  const [shareableLink, setShareableLink] = useState('')
  const [tooltiptext, setTooltiptext] = useState('Click to Copy')
  const [duplicateList, setDuplicateList] = useState([])

  const updateStatusMessage = (message, status) => {
    setActionStatus({
      message: message || '',
      success: status || false,
    })
  }

  const submitForm = async ({ formData }) => {
    console.debug(formData)
    setLoading(true)
    updateStatusMessage()
    const responseData = await SendAssets.send(
      assetId,
      wallet,
      csvTransactions,
      escrowPermission
    )
    // console.debug('responseData', responseData)
    setLoading(false)
    if (responseData.error == 'info') {
      updateStatusMessage(responseData.message, false)
    }
    if (responseData instanceof Error) {
      setStatus()
      setHideProgress(true)
      if (
        /PopupOpenError|blocked|Can not open popup window/.test(responseData)
      ) {
        updateStatusMessage(
          t(
            'Please disable your popup blocker (likely in the top-right of your browser window)'
          ),
          false
        )
        return
      }
      updateStatusMessage(
        responseData.body?.message ||
          responseData.message ||
          t('Sorry, an error occurred'),
        false
      )
    }
    if (responseData?.error == false) {
      if (responseData.confirmedTransactions.accepted == false) {
        updateStatusMessage(
          'Please, ensure you enter a valid wallet address with the asset id provided',
          false
        )
      } else {
        const totalAssets = responseData.confirmedTransactions.length
        const sentAssets = responseData.confirmedTransactions.filter(
          (asset) => asset.value.status == 'confirmed'
        ).length
        updateStatusMessage(
          `${sentAssets}/${totalAssets} ${t(
            'transaction(s) sent successfully'
          )}`,
          true
        )
        setShareableLink(Helper.getShareableRedeemLink(wallet, assetId))
        getAssetBalance()
      }
    }
  }

  const hasStatusBar = useMemo(() => {
    return typeof status !== 'undefined'
  }, [status])

  useEffect(() => {
    if (!gettingBalance) {
      getAssetBalance()
    }
  }, [assetId, csvTransactions, wallet, gettingBalance])

  useEffect(() => {
    if (actionStatus.message != '') {
      updateStatusMessage()
    }
  }, [assetId, csvTransactions, wallet])

  const getAssetBalance = async () => {
    if (wallet && assetId) {
      setGettingBalance(true)
      const responseData = await Helper.getFormattedAssetBalance(
        wallet,
        parseInt(assetId),
        true
      )
      setTimeout(() => {
        setGettingBalance(false)
      }, 2000)
      // console.debug('responseData', responseData)
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
  }

  const copyLink = () => {
    document.querySelector('.copyToClipboard')
    navigator.clipboard.writeText(shareableLink)
    setTooltiptext(`Copied: ${shareableLink}`)
    setTimeout(() => {
      setTooltiptext('Click to Copy')
    }, 500)
  }

  return (
    <Container sx={{ margin: 4 }}>
      <Head>
        <title>{`${t('/send-assets')} | ${t('app-title')}`}</title>
      </Head>
      <Typography
        variant="h5"
        sx={{ marginBottom: '1rem' }}
        data-testid="page-title"
      >
        {t('/send-assets')}
      </Typography>
      <Button variant="contained" onClick={connect}>
        {t('connect-wallet')}
      </Button>
      {assetBalance.message != '' && (
        <Typography
          variant="error-message"
          display="block"
          marginTop="1rem"
          color={assetBalance.success ? 'info.success' : 'info.error'}
        >
          {assetBalance.message} {assetBalance.success ? 'available' : ''}
        </Typography>
      )}
      <SendAssetForm
        formattedAddresses={formattedAddresses}
        onSubmit={submitForm}
        isLoading={loading}
        setWallet={setWallet}
        actionStatus={actionStatus}
        setAssetId={setAssetId}
        csvTransactions={csvTransactions}
        assetId={assetId}
        wallet={wallet}
        assetBalance={assetBalance}
        setCsvTransactions={setCsvTransactions}
        setDuplicateList={setDuplicateList}
        updateStatusMessage={updateStatusMessage}
        setEscrowPermission={setEscrowPermission}
      />
      {hasStatusBar && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={7} xl={6}>
            <LinearProgressWithLabel
              status={status}
              progress={progress}
              total={total}
              hideProgress={hideProgress}
            />
          </Grid>
        </Grid>
      )}
      {duplicateList.length > 0 && (
        <>
          <Typography
            variant="error-message"
            display="block"
            marginTop="1rem"
            marginBottom="0"
            color={'info.error'}
          >
            {t('Find below the duplicate wallet address')}
            {duplicateList.length > 1 && 'es'}:
          </Typography>
          <List dense={false}>
            {duplicateList.map((d) => (
              <ListItem key={d} sx={{ paddingBlock: '0' }}>
                <ListItemText
                  primary={d}
                  sx={{ color: 'info.error', marginBlock: '0' }}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
      {actionStatus.success == true && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={6} xl={5}>
            <Box
              marginTop="3rem"
              sx={{
                border: 'solid 2px',
                borderColor: 'secondary.main',
                padding: '1rem',
                borderRadius: '0.2rem',
              }}
            >
              <Box
                variant="error-message"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Link
                  href={shareableLink}
                  target="_blanc"
                  sx={{ color: 'info.main' }}
                >
                  {t('Share this link with receiver(s) to redeem asset(s)')}:
                </Link>
                <Tooltip
                  title={tooltiptext}
                  placement="top"
                  arrow
                  sx={{
                    cursor: 'pointer',
                    marginLeft: '0.5rem',
                  }}
                >
                  <ContentCopyIcon
                    onClick={copyLink}
                    className="copyToClipboard"
                    fontSize="0.9rem"
                  />
                </Tooltip>
              </Box>
              <Typography variant="p" marginY={'1rem'}>
                {t(
                  'Link above takes users to the redeem page of this site and autofills sender address. Receivers will need to opt into the asset before claiming'
                )}
                .
              </Typography>
              <Typography
                variant="p"
                fontStyle="italic"
                marginLeft="1rem"
                color={(theme) => theme.palette.grey.main}
              >
                *{' '}
                {t(
                  'Receivers already opted into the asset before it was sent will automatically receive them without needing to redeem via Algodex Mailbox or other steps'
                )}
                .
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2} sx={{ paddingBlock: '2rem' }}>
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
    </Container>
  )
}

export default SendAssetPage
