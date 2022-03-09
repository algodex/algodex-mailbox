const Ajv = require('ajv')
/**
 * A URI of a resource
 * @typedef {string} URI
 */
/**
 * Algorand ASA
 * @typedef {Object} Asset
 */
/**
 * Wallet
 * @typedef {Object} Wallet
 */
/**
 * Wallet List
 * @typedef {array<Wallet>} WalletList
 */
/**
 * Algorand Node SDK v2
 * @typedef {algosdk.Algodv2} Algodv2
 */
/**
 * Algorand Indexer SDK
 * @typedef {algosdk.Indexer} Indexer
 */
/**
 * Configuration for a Service
 * @typedef {Object} ServiceConfig
 * @property {URI} uri A URI for the service
 * @property {string} token API Token for the service
 */
/**
 * Mailbox Configuration
 * @typedef {Object} MailboxConfig
 * @property {ServiceConfig} algod Algorand node config
 * @property {ServiceConfig} indexer Algorand indexer config
 * @property {ServiceConfig} dexd Algodex api config
 */
/**
 * Setter Options
 * @typedef {Object} SetterOptions
 * @property {boolean} validate Enable validation
 */


let ajv
/**
 *
 * @type {ajv | ajv.Ajv}
 */
module.exports = (function(){
  if(!( ajv instanceof Ajv)){
    ajv = new Ajv(/*{allErrors: true}*/)

    // Define Schemas
    // TODO: Host schemas to remove them from the bundle
    const schemas = {
      'URI': require('../spec/URI.json'),
      'Config': require('../spec/Config.json'),
      'Mailbox': require('../spec/Mailbox.json'),
      'Asset.id': require('../spec/Asset/Index.json'),
      'Wallet': require('../spec/Wallet.json'),
      'Wallet.address': require('../spec/Wallet/Address.json'),
      'Wallet.AddressList': require('../spec/Wallet/AddressList.json'),
      'Transaction.RedeemFromMailbox': require('../spec/Transactions/RedeemFromMailbox.json'),
      'Transaction.SendToMailbox': require('../spec/Transactions/SendToMailbox.json'),
      'Transaction': require('../spec/Transaction.json'),
    }
    // Add Schemas to AJV
    Object.keys(schemas).forEach((key)=>{
      ajv.addSchema(schemas[key], key)
    })
  }
  return ajv
})()
