/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, { useEffect, useState } from 'react'
import { MuiForm5 as Form } from '@rjsf/material-ui'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'

//MUI components
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

// Custom Components
import CollapseableErrorMessage from './CollapseableErrorMessage'
import UploadContainer from './UploadContainer'
import { AssetSearchInput } from './AssetSearchInput'
import { WalletAddresses } from './WalletAddresses'
import { WalletAddressTextField } from './WalletAddressTextField'

const ReturnAssetForm = ({
  formattedAddresses,
  isLoading,
  setAssetId,
  actionStatus,
  setSenderAddress,
  setCsvTransactions,
  onSubmit,
  setDuplicateList,
  updateStatusMessage,
  disableButton,
}) => {
  const { t } = useTranslation('common')
  const [uploadType, setUploadType] = useState()
  const [ToWallet, setToWallet] = useState()
  const [Amount, setAmount] = useState()

  const schema = {
    required: ['assetId', 'csvTransactions'],
    properties: {
      assetId: { type: 'string', title: 'Asset Id', default: '' },
      csvTransactions: {
        type: 'string',
        title: 'CSV Recipients',
        default: '',
      },
    },
  }

  const uiSchema = {
    assetId: {
      'ui:widget': 'CustomInput',
    },
    csvTransactions: {
      'ui:widget': 'hidden',
    },
  }

  const CustomInputComponent = (props) => {
    return (
      <Box>
        <FormControl fullWidth>
          <AssetSearchInput setAssetId={setAssetId} parentProp={props} />
        </FormControl>
      </Box>
    )
  }
  const widgets = {
    CustomInput: CustomInputComponent,
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
        setWallet={setSenderAddress}
        formattedAddresses={formattedAddresses}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={6} xl={5}>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            onSubmit={onSubmit}
            widgets={widgets}
            disabled={formattedAddresses.length < 1}
            autoComplete="on"
          >
            <Box mt={'1rem'} mb={'.8rem'}>
              <Typography variant="h7" fontWeight={700}>
                How many address to send to?
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
                  sx={{ opacity: uploadType == 'single' ? 0.5 : 1 }}
                  label={t('Send to multiple address with a .CSV file')}
                />
                <FormControlLabel
                  value={'single'}
                  control={
                    <Radio
                      color="secondary"
                      data-testid="single-address-radio"
                    />
                  }
                  sx={{ opacity: uploadType == 'multiple' ? 0.5 : 1 }}
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
            <Box marginTop={'2rem'}>
              <LoadingButton
                data-testid="submit-btn"
                loading={isLoading}
                variant="contained"
                disabled={disableButton}
                type="submit"
                sx={{ textDecoration: 'capitalize' }}
              >
                {t('/return-assets')}
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

ReturnAssetForm.propTypes = {
  formattedAddresses: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setSenderAddress: PropTypes.func,
  setAssetId: PropTypes.func,
  actionStatus: PropTypes.object,
  setDuplicateList: PropTypes.any,
  updateStatusMessage: PropTypes.func,
  setCsvTransactions: PropTypes.any,
  disableButton: PropTypes.bool,
}
export default ReturnAssetForm
