import React from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'

export const LinearProgressWithLabel = (props) => {
  const { value, report } = props
  return (
    <>
      <Typography variant='p' fontWeight={500} marginTop="1rem">{report}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} color={'progress'} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            value
          )}/100`}</Typography>
        </Box>
      </Box>
    </>
  )
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number,
  report: PropTypes.string,
}
