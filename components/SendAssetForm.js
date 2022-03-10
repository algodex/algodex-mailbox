import React from 'react'
import { MuiForm5 as Form } from '@rjsf/material-ui'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize'

const SendAssetForm = ({
  formattedAddresses,
  onSubmit,
  isLoading,
  setWallet,
  setAssetId,
  setCsvTransactions,
}) => {
  const CustomSelectComponent = (props) => {
    return (
      <Box sx={{ marginBottom: '1rem' }}>
        <FormControl>
          <RadioGroup
            aria-labelledby="wallet"
            name="wallet"
            onChange={(event, value) => {
              props.onChange(value)
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
    )
  }

  const CustomInputComponent = (props) => {
    return (
      <Box>
        <FormControl fullWidth>
          <TextField
            required
            id="outlined-required"
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

  const CustomTextAreaComponent = (props) => {
    return (
      <Box>
        <FormControl fullWidth>
          <TextareaAutosize
            minRows={9}
            maxRows={14}
            placeholder="Enter CSV transactions"
            // value={props.value}
            required={props.required}
            style={{ padding: '0.9rem' }}
            // onChange={(event) => props.onChange(event.target.value)}
            onChange={({ target: { value } }) => {
              props.onChange(value)
              setCsvTransactions(value)
            }}
          />
        </FormControl>
      </Box>
    )
  }
  const schema = {
    required: ['assetId', 'csvTransactions', 'wallet'],
    properties: {
      wallet: { type: 'string', title: 'wallet', default: '' },
      assetId: { type: 'string', title: 'Asset Id', default: '' },
      csvTransactions: {
        type: 'string',
        title: 'CSV Transactions',
        default: '',
      },
    },
  }

  const uiSchema = {
    assetId: {
      'ui:widget': 'CustomInput',
    },
    csvTransactions: {
      'ui:widget': 'CustomTextarea',
      'ui:placeholder': 'Enter CSV Transactions',
      'ui:options': {
        rows: 9,
      },
    },
    wallet: {
      'ui:widget': 'CustomSelect',
    },
  }

  const widgets = {
    CustomSelect: CustomSelectComponent,
    CustomInput: CustomInputComponent,
    CustomTextarea: CustomTextAreaComponent,
  }

  return (
    <Form
      schema={schema}
      disabled={formattedAddresses.length < 1}
      uiSchema={uiSchema}
      widgets={widgets}
      onSubmit={onSubmit}
    >
      <LoadingButton
        loading={isLoading}
        variant="contained"
        xs={{ marginBottom: '2rem' }}
        disabled={formattedAddresses.length < 1}
        type="submit"
      >
        Send Assets
      </LoadingButton>
    </Form>
  )
}

SendAssetForm.propTypes = {
  formattedAddresses: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
}
export default SendAssetForm
