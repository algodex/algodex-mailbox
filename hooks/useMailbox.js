import {useCallback, useContext} from 'react'
import useMyAlgo from '@/hooks/useMyAlgo'
import MailboxContext from '@/components/Provider/MailboxContext'
import useWatch from './useWatch'

/**
 * @typedef {Object} MailboxHook
 * @property {Mailbox|boolean} mailbox Mailbox Instance or false
 * @property {boolean} isConnected Has connected wallets
 * @property {function} setWallet Set Wallets
 * @property {function} setAsset Set Asset
 * @property {function} setConfig Set MailboxConfig
 * @property {function} setAddresses Set Available Addresses
 * @property {((function(): Promise<void>)|*)} connect MyAlgo Connect
 */
/**
 * useMailbox
 *
 * Hooks for working with the mailbox context. It constructs an instance of Mailbox
 *
 * @returns {MailboxHook}
 */
function useMailbox(){
  console.log('useMailbox(', arguments[0], ')')
  // Get Mailbox Context
  const mailbox = useContext(MailboxContext)
  // Watch for key changes
  useWatch(mailbox, ['config', 'algod', 'addresses', 'wallet', 'asset'])

  // Check for state
  const isConnected = typeof mailbox !== 'undefined' &&
    typeof mailbox.addresses !== 'undefined' && mailbox.addresses.length > 0

  // On MyAlgo Changes, update the Mailbox
  const handleMyAlgoChange = useCallback((response) => {
    console.log(response)
    if (response == null) {
      return
    }
    mailbox.setAddresses(response)
  }, [mailbox])

  // Hook into MyAlgo
  const connect = useMyAlgo({onChange:handleMyAlgoChange})

  // Return mailbox and Connect
  return {
    mailbox,
    connect,
    isConnected,
    send: mailbox.send,
    wallet: mailbox.wallet,
    setWallet: mailbox.setWallet,
    asset: mailbox.asset,
    setAsset: mailbox.setAsset,
    config: mailbox.config,
    setConfig: mailbox.setConfig,
    addresses: mailbox.addresses,
    setAddresses: mailbox.setAddresses
  }
}

export default useMailbox
