/* 
 * Algodex Mailbox 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'

export const LinearProgressWithLabel = (props) => {
  const { status, progress, total, hideProgress } = props
  return (
    <>
      <Typography variant="p" fontWeight={500} marginTop="1rem">
        {status}
      </Typography>
      {!hideProgress && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress
              variant="determinate"
              color={'progress'}
              value={(progress * 100) / (total === 0 ? 1 : total)}
            />
          </Box>
          <Box sx={{ minWidth: 40 }}>
            <Typography variant="body2" color="text.secondary">
              {/* {`${Math.round(
                (progress * 100) / (total === 0 ? 1 : total)
              )}/100`} */}
              {`${Math.round(progress)}/${Math.round(total)}`}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  )
}

LinearProgressWithLabel.propTypes = {
  status: PropTypes.string,
  progress: PropTypes.number,
  total: PropTypes.number,
  hideProgress: PropTypes.bool,
}
