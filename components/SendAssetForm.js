/* eslint-disable max-len */
/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, { useEffect, useState } from 'react'
import { MuiForm5 as Form } from '@rjsf/material-ui'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'

//MUI components
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import LoadingButton from '@mui/lab/LoadingButton'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

// Custom Components
import CollapseableErrorMessage from './CollapseableErrorMessage'
import UploadContainer from './UploadContainer'
import { AssetSearchInput } from './AssetSearchInput'
import { WalletAddresses } from './WalletAddresses'
import { WalletAddressTextField } from './WalletAddressTextField'

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
  const [uploadType, setUploadType] = useState()
  const [ToWallet, setToWallet] = useState()
  const [Amount, setAmount] = useState()

  const CustomInputComponent = (props) => {
    return (
      <Box>
        <FormControl fullWidth>
          <AssetSearchInput setAssetId={setAssetId} parentProp={props} />
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

  useEffect(() => {
    setCsvTransactions()
    if (ToWallet && Amount) {
      const csv = `ToWallet,Amount\n${ToWallet},${Amount}`
      setCsvTransactions(csv)
    }
  }, [ToWallet, Amount])

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
            <Box mt={'1rem'} mb={'.8rem'}>
              <Typography variant="h7" fontWeight={700}>
                How many addresses to send to?
              </Typography>
              <RadioGroup
                aria-labelledby="uploadType"
                name="uploadType"
                onChange={({ target: { value } }) => {
                  setUploadType(value)
                  setToWallet()
                  setAmount()
                  setCsvTransactions()
                }}
              >
                <FormControlLabel
                  value={'multiple'}
                  control={
                    <Radio
                      color="secondary"
                      data-testid="multiple-address-radio"
                    />
                  }
                  label={t('Send to multiple addresses with a .CSV file')}
                />
                <FormControlLabel
                  value={'single'}
                  control={
                    <Radio
                      color="secondary"
                      data-testid="single-address-radio"
                    />
                  }
                  label={t('Send to one address')}
                />
              </RadioGroup>
            </Box>
            {uploadType == 'single' && (
              <>
                <Box marginBottom={'0.8rem'}>
                  <FormControl fullWidth>
                    <TextField
                      data-testid="amount-input"
                      required
                      id="outlined-required"
                      name="Amount"
                      label="Amount"
                      onChange={({ target: { value } }) => {
                        setAmount(value)
                      }}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl fullWidth>
                    <WalletAddressTextField
                      setState={setToWallet}
                      updateStatusMessage={updateStatusMessage}
                      dataTestid="receiverAddress-input"
                      name="ReceiverAddress"
                      label="Receiver Address"
                    />
                  </FormControl>
                </Box>
              </>
            )}
            {uploadType == 'multiple' && (
              <UploadContainer
                setCsvTransactions={setCsvTransactions}
                updateStatusMessage={updateStatusMessage}
                setDuplicateList={setDuplicateList}
              />
            )}
            <Tooltip
              placement="top"
              title={t(
                'If checked, this will send to escrows on behalf of wallets that have not opted into the asset. Otherwise, it will skip sending to these wallet addresses.'
              )}
              arrow
            >
              <FormControlLabel
                sx={{ marginTop: '1rem' }}
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
