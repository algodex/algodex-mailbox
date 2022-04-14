import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { LinearProgressWithLabel } from './LinearProgressWithLabel'

const SendAssetProgress = ({ progress }) => {
  const [message, setMessage] = useState()
  const [value, setValue] = useState()
  useEffect(() => {
    if (progress == 'loading') {
      setMessage('Looking up wallet balances & signing logical signatures...')
      setValue(20)
    } else if (progress == 'signing1') {
      setMessage(
        'Sending transactions to the MyAlgo Connect bridge for signing...'
      )
      setValue(40)
    } else if (progress == 'signing2') {
      setValue(70)
      setMessage('Waiting for user signature via the MyAlgo GUI...')
    } else if (progress == 'sending') {
      setValue(95)
      setMessage(
        'Sending the transactions to the recipients on the blockchain...'
      )
    } else if (progress == 'complete' || progress == 'stop') {
      setValue()
      setMessage()
    }
  }, [progress])

  return <LinearProgressWithLabel value={value} report={message} />
}

SendAssetProgress.propTypes = {
  progress: PropTypes.string.isRequired,
}

export default SendAssetProgress
