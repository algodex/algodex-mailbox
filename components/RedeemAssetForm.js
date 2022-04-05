/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React from 'react'
import { MuiForm5 as Form } from '@rjsf/material-ui'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import LoadingButton from '@mui/lab/LoadingButton'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CollapseableErrorMessage from './CollapseableErrorMessage'

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
  console.log({formData})
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
            name="SenderAddress"
            required={props.required}
            defaultValue={formData.senderAddress}
            id="outlined-required"
            label="Sender Address"
            onChange={({ target: { value } }) => {
              props.onChange(value)
              setSenderAddress(value)
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
    if (
      !assetId ||
      !receiverAddress ||
      !senderAddress ||
      assetId == '' ||
      receiverAddress == '' ||
      senderAddress == '' ||
      (!isNaN(balance) && 0 >= balance)
    ) {
      return true
    }
    return false
  }
  return (
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
            Warning: You have not yet opted into the asset. Please do so in
            another wallet app.
          </Typography>
        </Box>
      )}
      <Grid container spacing={2} marginTop={'2rem'} marginBottom={'2rem'}>
        <Grid item xs={6} lg={4}>
          <LoadingButton
            loading={loading}
            variant="contained"
            type="submit"
            disabled={confirmDisabledState()}
          >
            Redeem
          </LoadingButton>
        </Grid>
        <Grid item xs={6} marginLeft='auto' textAlign='end'>
          <CollapseableErrorMessage actionStatus={actionStatus} />
        </Grid>
      </Grid>
    </Form>
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
