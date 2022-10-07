/* 
 * Algodex Service 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
import CollapseableStatusMessage from './CollapseableStatusMessage'
import { AssetSearchInput } from './AssetSearchInput'

// Lib Files
import { WalletAddressTextField } from './WalletAddressTextField'

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

  const schema = {
    required: ['assetId', 'senderAddress', 'receiverAddress'],
    properties: {
      assetId: { type: 'string', title: 'Asset Id' },
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
          <WalletAddressTextField
            setState={setSenderAddress}
            parentProp={props}
            defaultValue={formData.senderAddress}
            updateStatusMessage={updateStatusMessage}
            dataTestid="senderAddress-input"
            name="SenderAddress"
            label="Sender Address"
          />
        </FormControl>
      </Box>
    )
  }

  const ReceiverInputComponent = (props) => {
    return (
      <Box>
        <FormControl fullWidth>
          <WalletAddressTextField
            setState={setReceiverAddress}
            parentProp={props}
            defaultValue={formData.receiverAddress}
            updateStatusMessage={updateStatusMessage}
            dataTestid="receiverAddress-input"
            name="ReceiverAddress"
            label="Receiver Address"
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
    if (!assetId || !receiverAddress || !senderAddress || !(balance > 0) || !optInStatus) {
      return true
    }
    return false
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
                <Typography variant="status-message" color="error" data-testid='optinMessage'>
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
        <CollapseableStatusMessage actionStatus={actionStatus} />
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
  assetId: PropTypes.number,
  updateStatusMessage: PropTypes.func,
}
export default RedeemAssetForm
