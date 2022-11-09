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

/* 
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import { useState, useEffect, useRef } from 'react'

const ERROR = {
  FAILED_TO_INIT: 'MyAlgo Wallet failed to initialize.',
  FAILED_TO_CONNECT: 'MyAlgo Wallet failed to connect.'
}

export default function useMyAlgo(updateAddresses) {
  const [addresses, setAddresses] = useState()

  const myAlgoWallet = useRef()

  const connect = async () => {
    try {
      if (!myAlgoWallet.current) {
        console.error(ERROR.FAILED_TO_INIT)
        return
      }

      const accounts = await myAlgoWallet.current.connect()
      const _addresses = accounts.map((acct) => acct.address)
      setAddresses(_addresses)
      updateAddresses(_addresses)
    } catch (e) {
      console.error(ERROR.FAILED_TO_CONNECT, e)
    }
  }

  useEffect(() => {
    const initMyAlgoWallet = async () => {
      // '@randlabs/myalgo-connect' is imported dynamically because it uses the window object
      const MyAlgoWallet = (await import('@randlabs/myalgo-connect')).default
      myAlgoWallet.current = new MyAlgoWallet()
    }

    initMyAlgoWallet()
  }, [])

  return {
    connect,
    addresses
  }
}