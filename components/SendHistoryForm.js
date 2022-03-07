import React from 'react'
import { MuiForm5 as Form } from '@rjsf/material-ui'
import PropTypes from 'prop-types'
import LoadingButton from '@mui/lab/LoadingButton'

const SendHistoryForm = ({ onSubmit, isLoading, formData }) => {
  const schema = {
    required: ['assetId', 'senderAddress'],
    properties: {
      assetId: { type: 'string', title: 'Asset Id', default: '' },
      senderAddress: { type: 'string', title: 'Sender Address', default: '' },
      csvTransactions: {
        type: 'string',
        title: 'CSV Transactions',
        default: '',
        readOnly: true,
      },
    },
  }

  const uiSchema = {
    csvTransactions: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 9,
      },
    },
  }

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      onSubmit={onSubmit}
      formData={{
        assetId: formData.assetId,
        senderAddress: formData.senderAddress,
        csvTransactions: formData.csvTransactions,
      }}
    >
      <LoadingButton
        loading={isLoading}
        variant="contained"
        sx={{ marginTop: '2rem' }}
        type="submit"
      >
        Refresh
      </LoadingButton>
    </Form>
  )
}

SendHistoryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
export default SendHistoryForm
