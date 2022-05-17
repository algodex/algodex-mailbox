/* eslint-disable max-len */
/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React from 'react'
import { MuiForm5 as Form } from '@rjsf/material-ui'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'

import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import LoadingButton from '@mui/lab/LoadingButton'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'

import CollapseableErrorMessage from './CollapseableErrorMessage'
import UploadContainer from './UploadContainer'
import { AssetSearchInput } from './AssetSearchInput'
import { WalletAddresses } from './WalletAddresses'

const SendAssetForm = ({
  formattedAddresses,
  onSubmit,
  isLoading,
  setWallet,
  setAssetId,
  actionStatus,
  assetId,
  wallet,
  csvTransactions,
  setEscrowPermission,
  assetBalance,
  setCsvTransactions,
  setDuplicateList,
  updateStatusMessage,
}) => {
  const { t } = useTranslation('common')
  const CustomInputComponent = (props) => {
    return (
      <Box>
        <FormControl fullWidth>
          <AssetSearchInput
            disabled={formattedAddresses.length < 1}
            setAssetId={setAssetId}
            parentProp={props}
          />
        </FormControl>
      </Box>
    )
  }

  const schema = {
    required: ['assetId'],
    properties: {
      assetId: { type: 'string', title: 'Asset Id', default: '' },
    },
  }

  const uiSchema = {
    assetId: {
      'ui:widget': 'CustomInput',
    },
  }

  const widgets = {
    CustomInput: CustomInputComponent,
  }

  const checkDisabledState = () => {
    const balance = parseFloat(assetBalance.message)
    if (balance > 0 && wallet && assetId && csvTransactions) {
      return false
    }
    return true
  }
  return (
    <>
      <WalletAddresses
        setWallet={setWallet}
        formattedAddresses={formattedAddresses}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={7} xl={6}>
          <Form
            schema={schema}
            disabled={formattedAddresses.length < 1}
            uiSchema={uiSchema}
            widgets={widgets}
            onSubmit={onSubmit}
            autoComplete="on"
          >
            <UploadContainer
              setCsvTransactions={setCsvTransactions}
              updateStatusMessage={updateStatusMessage}
              setDuplicateList={setDuplicateList}
            />
            <Tooltip
              sx={{ marginTop: '1rem' }}
              title={t(
                'If checked, this will send to escrows on behalf of wallets that have not opted into the asset. Otherwise, it will skip sending to these wallet addresses.'
              )}
            >
              <FormControlLabel
                data-testid="checkbox-input"
                control={
                  <Checkbox
                    defaultChecked
                    onChange={(e) => setEscrowPermission(e.target.checked)}
                  />
                }
                label={t('Send to escrow if recipient is not opted in')}
              />
            </Tooltip>
            <Box marginTop={'2rem'}>
              <LoadingButton
                data-testid="submit-btn"
                loading={isLoading}
                variant="contained"
                disabled={checkDisabledState()}
                type="submit"
                sx={{ textDecoration: 'capitalize' }}
              >
                {t('/send-assets')}
              </LoadingButton>
            </Box>
          </Form>
        </Grid>
      </Grid>
      <Box marginTop={'2rem'}>
        <CollapseableErrorMessage actionStatus={actionStatus} />
      </Box>
    </>
  )
}

SendAssetForm.propTypes = {
  formattedAddresses: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  setWallet: PropTypes.any,
  setAssetId: PropTypes.any,
  actionStatus: PropTypes.object,
  assetId: PropTypes.any,
  wallet: PropTypes.any,
  csvTransactions: PropTypes.any,
  setEscrowPermission: PropTypes.any,
  assetBalance: PropTypes.object,
  setDuplicateList: PropTypes.any,
  updateStatusMessage: PropTypes.func,
  setCsvTransactions: PropTypes.any,
}
export default SendAssetForm
