/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'

import { MuiForm5 as Form } from '@rjsf/material-ui'

//MUI Components
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import LoadingButton from '@mui/lab/LoadingButton'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CollapseableErrorMessage from './CollapseableErrorMessage'
import { AssetSearchInput } from './AssetSearchInput'

// Lib Files
import Helper from '@/lib/helper'

const RedeemAssetForm = ({
  onSubmit,
  actionStatus,
  loading,
  setSenderAddress,
  setReceiverAddress,
  setAssetId,
  senderAddress,
  receiverAddress,
  assetId,
  optInStatus,
  formData,
  balance,
  updateStatusMessage,
}) => {
  const { t } = useTranslation('common')
  const [timer, setTimer] = useState(null)

  const schema = {
    required: ['assetId', 'senderAddress', 'receiverAddress'],
    properties: {
      assetId: { type: 'string', title: 'Asset Id', default: '' },
      senderAddress: { type: 'string', title: 'Sender Address', default: '' },
      receiverAddress: {
        type: 'string',
        title: 'Receiver Address',
        default: '',
      },
    },
  }

  const AssetIdInputComponent = (props) => {
    return (
      <Box>
        <FormControl fullWidth>
          <AssetSearchInput
            setAssetId={setAssetId}
            parentProp={props}
            defaultValue={formData.assetId}
          />
        </FormControl>
      </Box>
    )
  }

  const SenderInputComponent = (props) => {
    return (
      <Box>
        <FormControl fullWidth>
          <TextField
            data-testid="senderAddress-input"
            name="SenderAddress"
            required={props.required}
            defaultValue={formData.senderAddress}
            id="outlined-required"
            label="Sender Address"
            onChange={({ target: { value } }) => {
              updateField(value, props, setSenderAddress)
            }}
          />
        </FormControl>
      </Box>
    )
  }

  const ReceiverInputComponent = (props) => {
    return (
      <Box>
        <FormControl fullWidth>
          <TextField
            data-testid="receiverAddress-input"
            name="ReceiverAddress"
            required={props.required}
            id="outlined-required"
            defaultValue={formData.receiverAddress}
            label="Receiver Address"
            onChange={({ target: { value } }) => {
              updateField(value, props, setReceiverAddress)
            }}
          />
        </FormControl>
      </Box>
    )
  }
  const uiSchema = {
    assetId: {
      'ui:widget': 'AssetIdInput',
    },
    senderAddress: {
      'ui:widget': 'SenderInput',
    },
    receiverAddress: {
      'ui:widget': 'ReceiverInput',
    },
  }

  const widgets = {
    AssetIdInput: AssetIdInputComponent,
    SenderInput: SenderInputComponent,
    ReceiverInput: ReceiverInputComponent,
  }

  const confirmDisabledState = () => {
    if (!assetId || !receiverAddress || !senderAddress || !(balance > 0)) {
      return true
    }
    return false
  }

  const fetchData = (value, type, setState) => {
    clearTimeout(timer)
    const newTimer = setTimeout(async () => {
      let response = await Helper.getAlgoNamesOrAddress(value, type)
      if (response instanceof Error) {
        updateStatusMessage('This is not a valid Algorand address', false)
      } else {
        setState(response)
      }
    }, 500)
    setTimer(newTimer)
  }

  const updateField = (value, props, setState) => {
    updateStatusMessage()
    const lastWord = value.split('.')[value.split('.').length - 1]
    if (lastWord == 'algo') {
      fetchData(value, 'getOwner', setState)
      return
    }
    props.onChange(value)
    setState(value)
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={6} xl={5}>
          <Form
            schema={schema}
            onSubmit={onSubmit}
            uiSchema={uiSchema}
            widgets={widgets}
            formData={formData}
            autoComplete="on"
          >
            {optInStatus == false && (
              <Box marginTop="2rem">
                <Typography variant="error-message" color="error">
                  {t(
                    // eslint-disable-next-line max-len
                    'Warning: You have not yet opted into the asset. Please do so in another wallet app.'
                  )}
                </Typography>
              </Box>
            )}
            <Box marginTop={'2rem'}>
              <LoadingButton
                data-testid="submit-btn"
                loading={loading}
                variant="contained"
                type="submit"
                disabled={confirmDisabledState()}
                sx={{ textDecoration: 'capitalize' }}
              >
                {t('Redeem')}
              </LoadingButton>
            </Box>
          </Form>
        </Grid>
      </Grid>
      <Box marginTop={'2rem'} marginBottom={'1rem'}>
        <CollapseableErrorMessage actionStatus={actionStatus} />
      </Box>
    </>
  )
}

RedeemAssetForm.propTypes = {
  onSubmit: PropTypes.func,
  optInStatus: PropTypes.bool,
  actionStatus: PropTypes.object,
  loading: PropTypes.bool,
  setSenderAddress: PropTypes.any,
  setReceiverAddress: PropTypes.any,
  setAssetId: PropTypes.any,
  formData: PropTypes.object,
  balance: PropTypes.number,
  senderAddress: PropTypes.string,
  receiverAddress: PropTypes.string,
  assetId: PropTypes.string,
  updateStatusMessage: PropTypes.func,
}
export default RedeemAssetForm
