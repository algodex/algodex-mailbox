import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'

const CollapseableErrorMessage = ({ actionStatus }) => {
  const [previewtext, setPreviewtext] = useState()
  const [extraContent, setExtraContent] = useState()
  console.log(actionStatus)
  const actionStatusF = {
    message:
      // eslint-disable-next-line max-len
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.',
    success: false,
  }

  useEffect(() => {
    checkContent(actionStatusF.message)
  }, [actionStatusF.message])

  const checkContent = (message) => {
    if (message) {
      const list = message.split('')
      const listLength = list.length
      if (listLength < 10) {
        setPreviewtext(message)
        setExtraContent()
      } else {
        const preview = list.slice(0, 10).join('')
        console.log({ preview })
        setPreviewtext(preview)
        const extra = list.slice(11, listLength).join('')
        console.log({ extra })
        setExtraContent(extra)
      }
    }
  }
  return (
    <>
      {actionStatusF.message != '' && (
        <Typography
          variant="error-message"
          sx={{ display: 'flex', justifyContent: 'end' }}
          color={actionStatusF.success ? 'green' : 'error'}
        >
          {previewtext}
          {extraContent && (
            <>
              <Typography sx={{ textDecoration: 'underline' }}>
                {extraContent}
              </Typography>
            </>
          )}
        </Typography>
      )}
    </>
  )
}

CollapseableErrorMessage.propTypes = {
  message: PropTypes.object.isRequired,
}

export default CollapseableErrorMessage
