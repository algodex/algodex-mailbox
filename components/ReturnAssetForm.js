import React from 'react'
import { MuiForm5 as Form } from '@rjsf/material-ui'
import PropTypes from 'prop-types'
import LoadingButton from '@mui/lab/LoadingButton'

const ReturnAssetForm = ({ onSubmit, isLoading }) => {
  const schema = {
    required: ['assetId', 'csvRecipients', 'senderAddress'],
    properties: {
      assetId: { type: 'string', title: 'Asset Id', default: '' },
      senderAddress: { type: 'string', title: 'Sender Address', default: '' },
      csvRecipients: {
        type: 'string',
        title: 'CSV Recipients',
        default: '',
      },
    },
  }

  const uiSchema = {
    csvRecipients: {
      'ui:widget': 'textarea',
      'ui:placeholder': 'Enter CSV Transactions',
      'ui:options': {
        rows: 9,
      },
    },
  }

  return (
    <Form schema={schema} uiSchema={uiSchema} onSubmit={onSubmit}>
      <LoadingButton
        loading={isLoading}
        variant="contained"
        xs={{ marginBottom: '2rem' }}
        type="submit"
      >
        Return Assets
      </LoadingButton>
    </Form>
  )
}

ReturnAssetForm.propTypes = {
  formattedAddresses: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
}
export default ReturnAssetForm
