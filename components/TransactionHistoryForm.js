/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React from 'react'
import { useTranslation } from 'next-i18next'
import { MuiForm5 as Form } from '@rjsf/material-ui'
import PropTypes from 'prop-types'
import LoadingButton from '@mui/lab/LoadingButton'
import Grid from '@mui/material/Grid'
import CollapseableErrorMessage from './CollapseableErrorMessage'
import Box from '@mui/material/Box'

const TransactionHistoryForm = ({
  onSubmit,
  isLoading,
  formData,
  actionStatus,
}) => {
  const { t } = useTranslation('common')
  const schema = {
    required: ['assetId', 'senderAddress'],
    properties: {
      assetId: { type: 'string', title: 'Asset Id', default: '' },
      senderAddress: { type: 'string', title: 'Sender Address', default: '' },
      csvTransactions: {
        type: 'string',
        title: 'CSV Transactions',
        readOnly: true,
      },
    },
  }

  const uiSchema = {
    csvTransactions: {
      'ui:widget': 'hidden',
    },
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={6} xl={5}>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            onSubmit={onSubmit}
            onChange={({ formData }) => {
              onSubmit({ formData })
            }}
            formData={{
              assetId: formData.assetId,
              senderAddress: formData.senderAddress,
              csvTransactions: formData.csvTransactions,
            }}
            autoComplete="on"
            disabled={true}
          >
            <Box marginTop={'2rem'}>
              <LoadingButton
                data-testid="submit-btn"
                loading={isLoading}
                variant="contained"
                disabled={true}
                type="submit"
                sx={{ textDecoration: 'capitalize' }}
              >
                {t('Refresh')}
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

TransactionHistoryForm.propTypes = {
  onSubmit: PropTypes.func,
  actionStatus: PropTypes.object,
  isLoading: PropTypes.bool,
  formData: PropTypes.object,
}
export default TransactionHistoryForm
