/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React from 'react'
import { MuiForm5 as Form } from '@rjsf/material-ui'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'

import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'


import CollapseableErrorMessage from './CollapseableErrorMessage'
import UploadContainer from './UploadContainer'
import { AssetSearchInput } from './AssetSearchInput'

import { WalletAddresses } from './WalletAddresses'

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
          <AssetSearchInput
            setAssetId={setAssetId}
            parentProp={props}
          />
        </FormControl>
      </Box>
    )
  }
  const widgets = {
    CustomInput: CustomInputComponent,
  }
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
            <UploadContainer
              setCsvTransactions={setCsvTransactions}
              updateStatusMessage={updateStatusMessage}
              setDuplicateList={setDuplicateList}
            />
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
