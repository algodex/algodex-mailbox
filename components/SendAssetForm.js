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
import Button from '@mui/material/Button'
import UploadFileIcon from '@mui/icons-material/UploadFile'

const labelStyles = {
  marginTop: '1rem',
  display: 'flex',
  justifyContent: 'end',
}

const SendAssetForm = ({
  formattedAddresses,
  onSubmit,
  isLoading,
  setWallet,
  setAssetId,
  csvTransactions,
  getFileUpload,
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
            disabled={formattedAddresses.length < 1}
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
            disabled={formattedAddresses.length < 1}
            placeholder="Click button below to upload your CSV transactions"
            value={props.value}
            readOnly
            required={props.required}
            style={{ padding: '0.9rem' }}
          />
        </FormControl>
        <label htmlFor="contained-button-file" style={labelStyles}>
          <input
            accept="text/csv"
            id="contained-button-file"
            type="file"
            hidden
            onChange={getFileUpload}
          />
          <Button variant="contained" component="span" startIcon={<UploadFileIcon/>}>
            Upload CSV 
          </Button>
        </label>
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
      formData={{csvTransactions}}
    >
      <Box marginTop="2rem">
        <LoadingButton
          loading={isLoading}
          variant="contained"
          disabled={formattedAddresses.length < 1}
          type="submit"
        >
          Send Assets
        </LoadingButton>
      </Box>
    </Form>
  )
}

SendAssetForm.propTypes = {
  formattedAddresses: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
}
export default SendAssetForm
