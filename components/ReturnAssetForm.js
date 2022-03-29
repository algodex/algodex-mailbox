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
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

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
  setAssetId,
  getFileUpload,
  fileName,
  actionStatus,
}) => {
  const schema = {
    required: ['assetId', 'csvTransactions'],
    properties: {
      assetId: { type: 'string', title: 'Asset Id', default: '' },
      csvTransactions: {
        type: 'string',
        title: 'CSV Recipients',
        default: '',
      },
    },
  }

  const uiSchema = {
    assetId: {
      'ui:widget': 'CustomInput',
    },
    csvTransactions: {
      'ui:widget': 'hidden',
    },
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
  const widgets = {
    CustomInput: CustomInputComponent,
  }

  return (
    <>
      <Box
        sx={{ marginBlock: formattedAddresses.length > 0 ? '1rem' : '0rem' }}
      >
        <FormControl>
          <RadioGroup
            aria-labelledby="senderAddress"
            name="senderAddress"
            onChange={(event, value) => {
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
        <Grid container spacing={2} marginTop={'2rem'}>
          <Grid item xs={6} lg={4}>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              disabled={formattedAddresses.length < 1}
              type="submit"
            >
              Return Assets
            </LoadingButton>
          </Grid>
          <Grid item xs={6}>
            {actionStatus.message != '' && (
              <Typography
                variant="error-message"
                sx={{ display: 'flex', justifyContent: 'end' }}
                color={actionStatus.success ? 'green' : 'error'}
              >
                {actionStatus.message}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Form>
    </>
  )
}

ReturnAssetForm.propTypes = {
  formattedAddresses: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setSenderAddress: PropTypes.func,
  setAssetId: PropTypes.func,
  getFileUpload: PropTypes.func.isRequired,
  fileName: PropTypes.string,
  actionStatus: PropTypes.object
}
export default ReturnAssetForm
