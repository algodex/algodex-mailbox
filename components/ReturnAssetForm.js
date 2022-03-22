import React from 'react'
import { MuiForm5 as Form } from '@rjsf/material-ui'
import PropTypes from 'prop-types'

import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
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

const ReturnAssetForm = ({
  formattedAddresses,
  onSubmit,
  isLoading,
  setSenderAddress,
  getFileUpload,
  fileName,
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
      'ui:widget': 'hidden',
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
      <Box>
        {fileName ? (
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadFileIcon />}
            style={{ marginTop: '1rem' }}
          >
            {fileName}
          </Button>
        ) : (
          <label htmlFor="contained-button-file" style={styles.uploadWrapper}>
            <Typography variant="p" marginBottom="1rem">
              Click to upload CSV transactions
            </Typography>
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
              Upload CSV
            </Button>
          </label>
        )}
      </Box>
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
