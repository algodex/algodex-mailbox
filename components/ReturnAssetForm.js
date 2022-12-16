/* 
 * Algodex Mailbox 
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

import React, { useEffect, useState } from 'react'
import { MuiForm5 as Form } from '@rjsf/material-ui'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'

//MUI components
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Tooltip from '@mui/material/Tooltip'
import TipsAndUpdatesTwoToneIcon from '@mui/icons-material/TipsAndUpdatesTwoTone'

// Custom Components
import CollapseableStatusMessage from './CollapseableStatusMessage'
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
    if (ToWallet) {
      const csv = `ToWallet,Amount\n${ToWallet},0`
      setCsvTransactions(csv)
    } else {
      setCsvTransactions()
    }
  }, [ToWallet])

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
                {t('How many addresses to return from?')}
              </Typography>
              <RadioGroup
                aria-labelledby="uploadType"
                name="uploadType"
                onChange={({ target: { value } }) => {
                  setUploadType(value)
                  setToWallet()
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
                  label={t('Return from multiple addresses with a .CSV file')}
                />
                <FormControlLabel
                  value={'single'}
                  control={
                    <Radio
                      color="secondary"
                      data-testid="single-address-radio"
                    />
                  }
                  label={t('Return from single address')}
                />
              </RadioGroup>
            </Box>
            {uploadType == 'single' && (
              <Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Tooltip
                    placement="top"
                    title={t(
                      'Enter the account which the assets need to be returned from'
                    )}
                    arrow
                  >
                    <TipsAndUpdatesTwoToneIcon color="info" fontSize="0.5rem" />
                  </Tooltip>
                </Box>
                <FormControl fullWidth>
                  <WalletAddressTextField
                    setState={setToWallet}
                    updateStatusMessage={updateStatusMessage}
                    dataTestid="receiverAddress-input"
                    name="ReceiverAddress"
                    label="Receiver Address or NFD"
                    placeholder={t(
                      'Enter the account which the assets need to be returned from'
                    )}
                  />
                </FormControl>
              </Box>
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
        <CollapseableStatusMessage actionStatus={actionStatus} />
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
