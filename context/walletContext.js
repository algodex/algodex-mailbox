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

import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import QRCodeModal from 'algorand-walletconnect-qrcode-modal'

// Lib Files
import Helper from '@/lib/helper'

//Custom hooks
import useMyAlgo from '@/hooks/use-my-algo'
import useWalletConnect from '@/hooks/useWalletConnect'

export const WalletTypes = {
  myAlgo: 'myAlgo',
  pera: 'wallet-connect',
}

export const WalletContext = createContext(undefined)

export const WalletProvider = ({ children }) => {
  const [formattedAddresses, setFormattedAddresses] = useState([])
  const [selectedWallet, setSelectedWallet] = useState('')
  const walletConnect = useRef()

  const initWalletConnect = async () => {
    const WalletConnect = (await import('@walletconnect/client')).default
    walletConnect.current = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org', // Required
      qrcodeModal: QRCodeModal,
    })
    walletConnect.current.connected = false
    return walletConnect.current
  }

  useEffect(() => {
    initWalletConnect()
    const _addresses =
      JSON.parse(localStorage.getItem('algodex_user_wallet_addresses')) || []
    setFormattedAddresses(_addresses)
    getAddyNames(_addresses)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateAddresses = useCallback(
    (addresses) => {
      //       console.debug('updating', addresses)
      if (addresses == null) {
        return
      }
      localStorage.setItem(
        'algodex_user_wallet_addresses',
        JSON.stringify(addresses)
      )
      getAddyNames(addresses)
    },
    [getAddyNames]
  )

  const getAddyNames = useCallback(async (addresses) => {
    let _addresses = []
    for (let addr of addresses) {
      _addresses.push({
        name:
          (await Helper.getAlgoNamesOrAddress(addr.address, 'getNames')) ||
          null,
        address: addr.address,
        type: addr.type,
      })
    }
    setFormattedAddresses(_addresses)
  }, [])

  const { connect: ConnectMyAlgo } = useMyAlgo(updateAddresses)
  const { connectWC, disconnectWC } = useWalletConnect({
    updateAddresses,
    walletConnect,
    initWalletConnect,
  })

  const connect = (type) => {
    const ConnectTypes = {
      myAlgo: ConnectMyAlgo,
      pera: connectWC,
    }
    ConnectTypes[type]()
  }

  const disconnect = (wallet) => {
    if (wallet.type === WalletTypes.pera) {
      disconnectWC()
    }
    updateAddresses(
      formattedAddresses.filter(({ address }) => address !== wallet.address)
    )
  }

  return (
    <WalletContext.Provider
      value={{
        formattedAddresses,
        connect,
        selectedWallet,
        setSelectedWallet,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
