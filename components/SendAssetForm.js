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
import Button from '@mui/material/Button'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import Typography from '@mui/material/Typography'

const styles = {
  uploadWrapper: {
    background: '#fffcff',
    height: '10rem',
    borderRadius: '0.4rem',
    border: '0.1rem dashed #a698b5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}

const SendAssetForm = ({
  formattedAddresses,
  onSubmit,
  isLoading,
  setWallet,
  setAssetId,
  getFileUpload,
  fileName
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

  const schema = {
    required: ['assetId', 'wallet'],
    properties: {
      wallet: { type: 'string', title: 'wallet', default: '' },
      assetId: { type: 'string', title: 'Asset Id', default: '' },
    },
  }

  const uiSchema = {
    assetId: {
      'ui:widget': 'CustomInput',
    },
    wallet: {
      'ui:widget': 'CustomSelect',
    },
  }

  const widgets = {
    CustomSelect: CustomSelectComponent,
    CustomInput: CustomInputComponent,
  }
  return (
    <Form
      schema={schema}
      disabled={formattedAddresses.length < 1}
      uiSchema={uiSchema}
      widgets={widgets}
      onSubmit={onSubmit}
    >
      <Box>
        <label htmlFor="contained-button-file" style={styles.uploadWrapper}>
          <Typography variant="p" marginBottom='1rem'>Click to upload CSV transactions</Typography>
          <input
            accept="text/csv"
            id="contained-button-file"
            type="file"
            hidden
            onChange={getFileUpload}
          />
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadFileIcon />}
          >
            {fileName || 'Upload CSV'}
          </Button>
        </label>
      </Box>

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
  isLoading:PropTypes.bool,
  setWallet:PropTypes.any,
  setAssetId:PropTypes.any,
  getFileUpload:PropTypes.func,
  fileName:PropTypes.any,
}
export default SendAssetForm
