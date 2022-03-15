import React from 'react'
import { MuiForm5 as Form } from '@rjsf/material-ui'
import PropTypes from 'prop-types'
import LoadingButton from '@mui/lab/LoadingButton'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Box from '@mui/material/Box'

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
        style={{ padding: '0.9rem' }}
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
      <Box marginTop="2rem">
        <LoadingButton loading={isLoading} variant="contained" type="submit">
          Refresh
        </LoadingButton>
      </Box>
    </Form>
  )
}

SendHistoryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
export default SendHistoryForm
