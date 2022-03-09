import React from 'react'
import PropTypes from 'prop-types'
import Mailbox from '@/lib/Mailbox'
import {createContext, useMemo} from 'react'

const MailboxContext = createContext()

/**
 *
 * @param {Object} props Component Properties
 * @param {Mailbox} props.mailbox The Mailbox Instance
 * @param {JSX.Element} [props.children] Component Children
 * @returns {JSX.Element}
 */
export function Provider({children, mailbox}){
  const context = useMemo(()=>mailbox, [mailbox])
  return (
    <MailboxContext.Provider value={context}>
      {children}
    </MailboxContext.Provider>
  )
}
Provider.propTypes = {
  /**
   * Children Components
   */
  children: PropTypes.node,
  /**
   * Instance of a Mailbox
   */
  mailbox: PropTypes.instanceOf(Mailbox)
}
export default MailboxContext
