import {useCallback, useEffect, useState} from 'react'
import events from '../lib/events'
function useSendAsset(){
  const [status, setStatus] = useState('uninitialized')

  const onSignWithMyAlgo = useCallback(({status: _status})=>{
    setStatus(_status)
  },[setStatus])

  // Example for testing without running framework
  //setTimeout(()=>{events.emit('sign-with-my-algo', {status: "Wow"})}, 1000)

  useEffect(()=>{
    events.on('sign-with-my-algo', onSignWithMyAlgo)

    return ()=> events.off('sign-with-my-algo')
  }, [onSignWithMyAlgo])

  return {status}
}

export default useSendAsset
