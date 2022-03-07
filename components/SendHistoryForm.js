import React from 'react'
import { MuiForm5 as Form } from '@rjsf/material-ui'
import PropTypes from 'prop-types'
import LoadingButton from '@mui/lab/LoadingButton'
import TextareaAutosize from '@mui/material/TextareaAutosize'

const SendHistoryForm = ({ onSubmit, isLoading, formData }) => {
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

  const customTextArea = (props) => {
    return (
      <TextareaAutosize
        minRows={9}
        maxRows={14}
        // eslint-disable-next-line max-len
        placeholder="Enter your assetId and sender's address above, your CSV transactions will be listed here"
        readOnly
        value={props.value}
        required={props.required}
        onChange={(event) => props.onChange(event.target.value)}
      />
    )
  }

  const widgets = {
    customTextArea: customTextArea,
  }

  const uiSchema = {
    csvTransactions: {
      'ui:widget': customTextArea,
    },
  }

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      onSubmit={onSubmit}
      widgets={widgets}
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
