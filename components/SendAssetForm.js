/* eslint-disable max-len */
/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React from 'react'
import { MuiForm5 as Form } from '@rjsf/material-ui'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import CollapseableErrorMessage from './CollapseableErrorMessage'

const styles = {
  uploadWrapper: {
    background: '#fffcff',
    height: '10rem',
    borderRadius: '0.4rem',
    border: '0.1rem dashed #a698b5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}

const SendAssetForm = ({
  formattedAddresses,
  onSubmit,
  isLoading,
  setWallet,
  setAssetId,
  getFileUpload,
  fileName,
  actionStatus,
  assetId,
  wallet,
  csvTransactions,
  setEscrowPermission,
  assetBalance,
}) => {
  const CustomInputComponent = (props) => {
    return (
      <Box>
        <FormControl fullWidth>
          <TextField
            required
            id="outlined-required"
            name="AssetId"
            disabled={formattedAddresses.length < 1}
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
    if (
      !(balance > 0) &&
      (!wallet || !assetId || !csvTransactions)
    ) {
      return true
    }
    return false
  }
  return (
    <>
      <Box
        sx={{ marginBlock: formattedAddresses.length > 0 ? '1rem' : '0rem' }}
      >
        <FormControl>
          <RadioGroup
            aria-labelledby="wallet"
            name="wallet"
            onChange={(event, value) => {
              setWallet(value)
            }}
          >
            {formattedAddresses.map((address) => (
              <FormControlLabel
                key={address}
                value={address}
                control={<Radio color="secondary" />}
                label={address}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
      <Form
        schema={schema}
        disabled={formattedAddresses.length < 1}
        uiSchema={uiSchema}
        widgets={widgets}
        onSubmit={onSubmit}
        autoComplete="on"
      >
        <Box>
          <label htmlFor="contained-button-file">
            <input
              accept="text/csv"
              id="contained-button-file"
              type="file"
              hidden
              onChange={getFileUpload}
            />
            {fileName ? (
              <Button
                variant="contained"
                component="span"
                startIcon={<UploadFileIcon />}
                style={{ marginTop: '1rem' }}
              >
                {fileName}
              </Button>
            ) : (
              <Box style={styles.uploadWrapper}>
                <Typography variant="p" marginBottom="1rem">
                  Click to upload CSV transactions
                </Typography>

                <Button
                  variant="contained"
                  component="span"
                  startIcon={<UploadFileIcon />}
                >
                  Upload CSV
                </Button>
              </Box>
            )}
          </label>
          <Tooltip title="If checked, this will send to escrows on behalf of wallets that have not opted into the asset. Otherwise, it will skip sending to these wallet addresses.">
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  onChange={(e) => setEscrowPermission(e.target.checked)}
                />
              }
              label="Send to escrow if recipient is not opted in"
            />
          </Tooltip>
        </Box>

        <Grid container spacing={2} marginTop={'2rem'}>
          <Grid item xs={6} lg={4}>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              disabled={checkDisabledState()}
              type="submit"
            >
              Send Assets
            </LoadingButton>
          </Grid>
          <Grid item xs={6} marginLeft="auto">
            <CollapseableErrorMessage actionStatus={actionStatus} />
          </Grid>
        </Grid>
      </Form>
    </>
  )
}

SendAssetForm.propTypes = {
  formattedAddresses: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  setWallet: PropTypes.any,
  setAssetId: PropTypes.any,
  getFileUpload: PropTypes.func,
  fileName: PropTypes.any,
  actionStatus: PropTypes.object,
  assetId: PropTypes.any,
  wallet: PropTypes.any,
  csvTransactions: PropTypes.any,
  setEscrowPermission: PropTypes.any,
  assetBalance: PropTypes.object,
}
export default SendAssetForm
