import React from 'react'
import { MuiForm5 as Form } from '@rjsf/material-ui'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import LoadingButton from '@mui/lab/LoadingButton'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const RedeemAssetForm = ({
  onSubmit,
  actionStatus,
  loading,
  setSenderAddress,
  setReceiverAddress,
  setAssetId,
}) => {
  const schema = {
    required: ['assetId', 'senderAddress', 'receiverAddress'],
    properties: {
      assetId: { type: 'string', title: 'Asset Id' },
      senderAddress: { type: 'string', title: 'Sender Address' },
      receiverAddress: { type: 'string', title: 'Receiver Address' },
    },
  }

  const AssetIdInputComponent = (props) => {
    return (
      <Box>
        <FormControl fullWidth>
          <TextField
            required
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
            required
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
            required
            id="outlined-required"
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
    // receiverAddress: {
    //   'ui:widget': 'ReceiverInput',
    // },
  }

  const widgets = {
    AssetIdInput: AssetIdInputComponent,
    SenderInput: SenderInputComponent,
    // ReceiverInput: ReceiverInputComponent,
  }
  return (
    <Form
      schema={schema}
      onSubmit={onSubmit}
      uiSchema={uiSchema}
      widgets={widgets}
    >
      <Grid container spacing={2} marginTop={'2rem'} marginBottom={'2rem'}>
        <Grid item xs={6} lg={4}>
          <LoadingButton loading={loading} variant="contained" type="submit">
            Redeem
          </LoadingButton>
        </Grid>
        <Grid item xs={6}>
          {actionStatus.message != '' && (
            <Typography
              variant="error-message"
              color={actionStatus.success ? 'green' : 'error'}
            >
              {actionStatus.message}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Form>
  )
}

RedeemAssetForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
export default RedeemAssetForm
