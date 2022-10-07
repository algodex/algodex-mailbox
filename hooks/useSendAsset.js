/* 
 * Algodex Service 
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
      if (_status == 'Transactions Sent!') {
        setTimeout(() => {
          setHideProgress(true)
          setStatus()
        }, 1000)
      }
    },
    [status, setStatus, progress, setProgress, total, setTotal]
  )

  useEffect(() => {
    events.on('getting-balance', onEvents)
    events.on('sign-with-my-algo', onEvents)
    events.on('send-all-transactions', onEvents)
    return () => {
      events.off('getting-balance')
      events.off('sign-with-my-algo')
      events.off('send-all-transactions')
    }
  }, [onEvents])

  return { progress, status, total, hideProgress, setHideProgress,setStatus }
}

export default useSendAsset
