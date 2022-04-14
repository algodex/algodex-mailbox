import {useCallback, useEffect, useState} from 'react'
import events from '../lib/events'
function useSendAsset(){
  const [status, setStatus] = useState('uninitialized')
  const [progress, setProgress] = useState(0)
  const [total, setTotal] = useState(0)

  // Create state flag for when you don't want to render the progress bar
  const [hideProgress, setHideProgress] =  useState(true)

  const onEvents = useCallback((props)=>{
    const {status: _status, progress:_progress, total:_total} = props
    // Always check before setting because an outside effect could have triggered a re-render
    if(typeof _status !== 'undefined' && _status !== status){
      setStatus(_status)
    }
    if(typeof _progress !== 'undefined' && _progress !== progress){
      setProgress(_progress)
    } else if(typeof _progress === 'undefined'){
      setHideProgress(true)
    }

    if(typeof _total !== 'undefined' && _total !== total){
      setTotal(_total)
    }

  },[status, setStatus, progress, setProgress, total, setTotal, setHideProgress])

  useEffect(()=>{
    events.on('sign-with-my-algo', onEvents )
    events.on('send-all-transactions', onEvents )
    //events.on('another-step-event', onEvents )
    return ()=> {
      events.off('sign-with-my-algo')
      //events.off('another-step-event', onEvents )
      //events.off('another-step-event', onEvents )
    }
  }, [onEvents ])

  return {progress, status, total, hideProgress}
}

export default useSendAsset
