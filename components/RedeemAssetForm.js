/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React from 'react'
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
}) => {
  const { t } = useTranslation('common')
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
          <TextField
            data-testid="assetId-input"
            name="AssetId"
            defaultValue={formData.assetId}
            required={props.required}
            id="outlined-required"
            label="Asset Id"
            onChange={({ target: { value } }) => {
              props.onChange(value)
              setAssetId(value)
            }}
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
              // props.onChange(value)
              // setSenderAddress(value)
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
              props.onChange(value)
              setReceiverAddress(value)
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

  const updateField = async (value, parentProps, setState) => {
    let names = await Helper.getAlgoNames(value)
    console.log({ names })
    if (names && names.length > 0) {
      console.log(names[0].name)
      parentProps.onChange(names[0].name)
      setState(names[0].name)
      // setState(names[0].address)
    } else {
      parentProps.onChange(value)
      setState(value)
    }
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
      <Box marginTop={'2rem'}>
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
}
export default RedeemAssetForm
