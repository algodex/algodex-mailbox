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

import {useCallback, useEffect, useState} from 'react'
import events from '../lib/events'
function useMailbox(){
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

export default useMailbox
