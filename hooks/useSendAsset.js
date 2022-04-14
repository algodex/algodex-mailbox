import {useCallback, useEffect, useState} from 'react'
import events from '../lib/events'
function useSendAsset(){
  const [progress, setProgress] = useState('uninitialized')

  const onSendAsset = useCallback(({status: _status})=>{
    setProgress(_status)
  },[setProgress])

  useEffect(()=>{
    events.on('sending-assets-event', onSendAsset)

    return ()=> events.off('sending-assets-event')
  }, [onSendAsset])

  return {progress}
}

export default useSendAsset
