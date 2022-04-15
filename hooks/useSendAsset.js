import { useCallback, useEffect, useState } from 'react'
import events from '../lib/events'
function useSendAsset() {
  const [status, setStatus] = useState()
  const [progress, setProgress] = useState(0)
  const [total, setTotal] = useState(0)
  const [hideProgress, setHideProgress] = useState(true)

  const onEvents = useCallback(
    (props) => {
      const { status: _status, progress: _progress, total: _total } = props
      // Always check before setting because an outside effect could have triggered a re-render
      if (typeof _status !== 'undefined' && _status !== status) {
        setStatus(_status)
      }
      if (typeof _progress !== 'undefined' && _progress !== progress) {
        setProgress(_progress)
        setHideProgress(false)
      } else if (typeof _progress === 'undefined') {
        setHideProgress(true)
      }

      if (typeof _total !== 'undefined' && _total !== total) {
        setTotal(_total)
      }
      if (_status == 'Transactions Sent!' || _status == 'error') {
        setTimeout(() => {
          setHideProgress(true)
        }, 1000)
      }
    },
    [status, setStatus, progress, setProgress, total, setTotal]
  )

  useEffect(() => {
    events.on('getting-balance', onEvents)
    events.on('sign-with-my-algo', onEvents)
    events.on('send-all-transactions', onEvents)
    events.on('Error', onEvents)
    return () => {
      events.off('getting-balance')
      events.off('sign-with-my-algo')
      events.off('send-all-transactions')
    }
  }, [onEvents])

  return { progress, status, total, hideProgress }
}

export default useSendAsset
