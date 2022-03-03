import Typography from '@mui/material/Typography'
import React from 'react'

/**
 * @todo: Move to theme
 * @deprecated
 * @param success
 * @param message
 * @returns {JSX.Element}
 * @constructor
 */
const ErrorMessage = ({ success, message }) => {
  return (
    <Typography
      variant="p"
      fontSize={'1.125rem'}
      fontWeight="700"
      fontStyle="italic"
      color={success ? 'status.success' : 'status.error'}
    >
      {message}
    </Typography>
  )
}

export default ErrorMessage
