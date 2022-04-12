/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React from 'react'
import { MuiForm5 as Form } from '@rjsf/material-ui'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import Grid from '@mui/material/Grid'
import CollapseableErrorMessage from './CollapseableErrorMessage'
import UploadContainer from './UploadContainer'

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
  assetBalance,
}) => {
  const { t } = useTranslation('common')
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
    if (!(balance > 0) && (!wallet || !assetId || !csvTransactions)) {
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
              <UploadContainer />
            )}
          </label>
        </Box>

        <Grid container spacing={2} marginTop={'2rem'}>
          <Grid item xs={6} lg={4}>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              disabled={checkDisabledState()}
              type="submit"
              sx={{textDecoration:'capitalize'}}
            >
              {t('/send-assets')}
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
  assetBalance: PropTypes.object,
}
export default SendAssetForm
