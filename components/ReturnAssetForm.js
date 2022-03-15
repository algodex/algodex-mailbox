import React from 'react'
import { MuiForm5 as Form } from '@rjsf/material-ui'
import PropTypes from 'prop-types'

import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

const ReturnAssetForm = ({
  formattedAddresses,
  onSubmit,
  isLoading,
  setSenderAddress,
}) => {
  const schema = {
    required: ['senderAddress', 'assetId', 'csvTransactions'],
    properties: {
      senderAddress: { type: 'string', title: 'Sender Address', default: '' },
      assetId: { type: 'string', title: 'Asset Id', default: '' },
      csvTransactions: {
        type: 'string',
        title: 'CSV Recipients',
        default: '',
      },
    },
  }

  const uiSchema = {
    csvTransactions: {
      'ui:widget': 'textarea',
      'ui:placeholder': 'Enter CSV Transactions',
      'ui:options': {
        rows: 9,
      },
    },
    senderAddress: {
      'ui:widget': 'CustomSelect',
    },
  }

  const CustomSelectComponent = (props) => {
    return (
      <Box sx={{ marginBottom: '1rem' }}>
        <FormControl>
          <RadioGroup
            aria-labelledby="senderAddress"
            name="senderAddress"
            onChange={(event, value) => {
              props.onChange(value)
              setSenderAddress(value)
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
    )
  }

  const widgets = {
    CustomSelect: CustomSelectComponent,
  }

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      onSubmit={onSubmit}
      widgets={widgets}
      disabled={formattedAddresses.length < 1}
    >
      <Box marginTop="2rem">
        <LoadingButton
          loading={isLoading}
          variant="contained"
          disabled={formattedAddresses.length < 1}
          type="submit"
        >
          Return Assets
        </LoadingButton>
      </Box>
    </Form>
  )
}

ReturnAssetForm.propTypes = {
  formattedAddresses: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}
export default ReturnAssetForm
