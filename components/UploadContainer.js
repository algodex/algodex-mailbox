/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React from 'react'
import { useTranslation } from 'next-i18next'

// MUI Components
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import UploadFileIcon from '@mui/icons-material/UploadFile'

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

const UploadContainer = () => {
  const { t } = useTranslation('common')
  return (
    <Box style={styles.uploadWrapper}>
      <Typography variant="p" marginBottom="1rem">
        {t('Click to upload CSV transactions')}
      </Typography>

      <Button
        variant="contained"
        component="span"
        startIcon={<UploadFileIcon />}
      >
        {t('Upload CSV')}
      </Button>
    </Box>
  )
}

export default UploadContainer
