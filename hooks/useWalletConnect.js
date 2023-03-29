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

import { useCallback, useEffect } from 'react'

import QRCodeModal from 'algorand-walletconnect-qrcode-modal'
import { WalletTypes } from '../context/walletContext'
const ERROR = {
  FAILED_TO_INIT: 'WalletConnect Wallet failed to initialize.',
  FAILED_TO_CONNECT: 'WalletConnect Wallet failed to connect.',
}

/**
 * Use Wallet Connect query
 * @param {Function} updateAddresses Update address Callback
 * @param {Function} walletConnect initialize Walletconnect
 * @param {Function} initWalletConnect initialize Walletconnect
 * @return {object}
 */
export default function useWalletConnect({
  updateAddresses,
  walletConnect,
  initWalletConnect,
}) {
  const connectWC = async () => {
    try {
      // Something went wrong!
      if (!walletConnect.current) {
        console.error(ERROR.FAILED_TO_INIT)
        return
      }
      // Check if connection is already established
      if (!walletConnect.current.connected) {
        if (walletConnect.current.sessionStarted) {
          // Reinitialize wallet connect
          walletConnect.current = await initWalletConnect()
          walletConnect.current.on('connect', handleConnected)
          walletConnect.current.on('session_update', handleConnected)
          walletConnect.current.on('disconnect', handleDisconnect)
        }
        // create new session
        walletConnect.current.createSession()
        walletConnect.current.sessionStarted = true
      } else {
        // Stop and start a new session
        walletConnect.current.killSession()
        setTimeout(() => {
          walletConnect.current.createSession()
        }, 1000)
      }
    } catch (e) {
      console.error(ERROR.FAILED_TO_CONNECT, e)
    }
  }

  const disconnectWC = () => {
    if (walletConnect.current.connected) {
      walletConnect.current.killSession()
      walletConnect.current.sessionStarted = false
    }
  }

  const handleDisconnect = useCallback(
    (err) => {
      console.debug('DISCONNECTED')
      if (err) throw err
      walletConnect.current.sessionStarted = false
      const prevAddresses =
        JSON.parse(localStorage.getItem('algodex_user_wallet_addresses')) || []
      updateAddresses(
        prevAddresses.filter(({ type }) => type !== WalletTypes.pera)
      )
    },
    [updateAddresses, walletConnect]
  )

  const handleConnected = (err, payload) => {
    if (err) {
      throw err
    }

    let accounts = []

    // Get provided accounts
    if (typeof payload !== 'undefined' && Array.isArray(payload.params)) {
      accounts = payload.params[0].accounts
    }

    // Map the connector to the address list
    const _addresses = accounts.map((acct) => ({
      type: 'wallet-connect',
      connector: walletConnect.current,
      address: acct,
    }))

    const prevAddresses =
      JSON.parse(localStorage.getItem('algodex_user_wallet_addresses')) || []

    const result = prevAddresses.reduce((current, newItem) => {
      return current.find((addr) => addr.address === newItem.address)
        ? current
        : [...current, newItem]
    }, _addresses)

    updateAddresses(result)

    QRCodeModal.close()
  }
  useEffect(() => {
    // let listener;
    if (typeof walletConnect.current !== 'undefined') {
      walletConnect.current.on('connect', handleConnected)
      walletConnect.current.on('session_update', handleConnected)
      walletConnect.current.on('disconnect', handleDisconnect)
    }
    return () => {
      if (typeof walletConnect.current !== 'undefined') {
        walletConnect.current.off('connect')
        walletConnect.current.off('session_update')
        walletConnect.current.off('disconnect')
      }
    }
  }, [walletConnect.current])

  return { connectWC, disconnectWC }
}
