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

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'

const CollapseableStatusMessage = ({ actionStatus }) => {
  const [readmore, setReadmore] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [previewtext, setPreviewtext] = useState()
  const [extraContent, setExtraContent] = useState()

  useEffect(() => {
    setShowContent(false)
    setReadmore(true)
    checkContent(actionStatus.message)
  }, [actionStatus.message])

  const checkContent = (message) => {
    if (message) {
      const list = message.split('')
      const listLength = list.length
      if (listLength < 45) {
        setPreviewtext(message)
        setExtraContent()
      } else {
        setReadmore(true)
        const preview = list.slice(0, 44).join('')
        setPreviewtext(`${preview}...`)
        setExtraContent(message)
      }
    }
  }
  return (
    <>
      {actionStatus.message != '' && (
        <Typography
          variant="status-message"
          // sx={{ display: 'flex', justifyContent: 'end' }}
          color={actionStatus.success ? 'info.success' : 'info.error'}
          data-testid="statusMessage"
        >
          <>
            {readmore ? previewtext : ''}
            {extraContent && (
              <>
                {showContent && (
                  <Typography variant="span" fontWeight={700}>
                    {extraContent}
                  </Typography>
                )}
                <Typography
                  variant="span"
                  sx={{
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: 11,
                    paddingLeft: '4px',
                    lineHeight: 2.5,
                  }}
                  onClick={() => {
                    setShowContent(!showContent)
                    setReadmore(!readmore)
                  }}
                >
                  {readmore ? 'Read More' : 'Read Less'}
                </Typography>
              </>
            )}
          </>
        </Typography>
      )}
    </>
  )
}

CollapseableStatusMessage.propTypes = {
  actionStatus: PropTypes.object.isRequired,
}

export default CollapseableStatusMessage
