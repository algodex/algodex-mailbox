const algosdk = require('algosdk')
const ajv = require('./schema')
const _ = require('lodash')
const ValidationError = require('./ValidationError')

// Pureish Function
const getHistory = require('./pure/getHistory')
const redeemAsset = require('./pure/redeemAsset')
const sendAsset = require('./pure/sendAsset')


/**
 * Mailbox
 *
 * API for working with Algodex-Mailbox
 *
 * @example
 * let mailbox = new Mailbox({config})
 * mailbox.setAsset({id: 12345})
 * mailbox.setWallet({address: "WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI"})
 * await mailbox.send(txn)
 * mailbox.setWallet({address: "WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI"}
 * await mailbox.redeem(txn)
 * await mailbox.getHistory(txn)
 *
 * @param {MailboxConfig} config Mailbox configuration
 * @param {Asset} [asset] Asset from Algorand
 * @param {Wallet} [wallet] Current Wallet
 * @param {WalletList} [addresses] List of available Wallet Addresses
 * @constructor
 */
function Mailbox({config, asset,wallet,  addresses=[]}={}){
  console.log('new Mailbox(',arguments[0],')')
  this.type = 'Mailbox'
  const validate = ajv.getSchema(this.type)

  // Validate Parameters
  if(!validate({type: this.type, wallet, asset, addresses, config})){
    // Failed to Construct Mailbox()
    throw new ValidationError(validate.errors)
  }

  // Initialization Flag
  this.isInitalized = false

  // Initialize the instance, skip validation
  const options = {validate: false}
  if(typeof config !== 'undefined') this.setConfig(config, options)
  if(typeof addresses !== 'undefined') this.setAddresses(addresses, options)
  else this.setAddresses([])
  if(typeof wallet !== 'undefined') this.setWallet(wallet, options)
  if(typeof asset !== 'undefined') this.setAsset(asset, options)
}

/**
 * Static Get History
 * @todo: Move to use internal this.indexer client
 */
Mailbox.getHistory = getHistory
/**
 *
 * @type {(keyRef: string) => (ajv.ValidateFunction | undefined)}
 */
Mailbox.getSchema = ajv.getSchema

function hasValidateOption(options){
  return (
    typeof options !== 'undefined' &&
    typeof options.validate !== 'undefined' &&
    options.validate
  )
}
/**
 * Mailbox Interface
 */
Mailbox.prototype = {
  // Example Getter:
  // get bill(){
  //   return '5'
  // },
  /**
   * Set Config
   *
   * Override the current configuration
   *
   * @example
   * let mailbox = new Mailbox({wallet, asset, config})
   * mailbox.setConfig(newConfig)
   *
   * @param {MailboxConfig} config Configuration Object
   * @param {SetterOptions} [options] Options for setting
   */
  setConfig(config, options = {validate: true}){
    // Optional validation
    if(hasValidateOption(options)){
      const validate = ajv.getSchema('Config')
      // Validate Parameter
      if(!validate(config)){
        // mailbox.setConfig() ValidationError
        throw new ValidationError(validate.errors)
      }
    }

    // Set instance
    this.algod = new algosdk.Algodv2(
      config.algod.token,
      config.algod.uri,
      config.algod.port | ''
    )
    this.config = config
    this.isInitalized = true
  },
  /**
   * Set Asset
   *
   * Changes the current asset
   *
   * @param {Asset} asset Algorand Asset
   * @param {SetterOptions} [options] Options for setting
   */
  setAsset(asset,  options = {validate: true}){
    if(!this.isInitalized) throw new Error('Mailbox not initialized, run setConfig')
    if(hasValidateOption(options)){
      const validate = ajv.getSchema('Asset')
      // Validate basic type errors
      if(!validate(asset)){
        // mailbox.setAsset Validation Error
        throw new ValidationError(validate.errors)
      }

      // More advanced state checks
      // if(this.wallet[asset.id].balance === 0){
      //   throw new Error('Low Balance')
      // }
    }

    // Set the asset
    this.asset = asset
  },
  /**
   *
   * @param {WalletList} addresses
   * @param {SetterOptions} [options] Options for setting
   */
  setAddresses(addresses, options = {validate: true}){
    if(!this.isInitalized) throw new Error('Mailbox not initialized, run setConfig')
    if(hasValidateOption(options)){
      const validate = ajv.getSchema('Wallet.AddressList')
      // Validate basic type errors
      if (!validate(addresses)) {
        throw new ValidationError(validate.errors)
      }
    }
    this.addresses = addresses
    if(typeof this.wallet === 'undefined' && this.addresses.length > 0){
      this.setWallet(this.addresses[0])
    }
  },
  /**
   * Set current Wallet
   * @param {Wallet} wallet
   * @param {SetterOptions} [options] Options for setting
   */
  setWallet(wallet,  options = {validate: true}){
    if(_.isUndefined(wallet)) throw new TypeError('Must have valid wallet')
    if(!this.isInitalized) throw new Error('Mailbox not initialized, run setConfig')
    if(hasValidateOption(options)){
      const validate = ajv.getSchema('Wallet')
      // Validate basic type errors
      if (!validate(wallet)) {
        throw new ValidationError(validate.errors)
      }
    }
    this.wallet = wallet
  },

  /**
   * Execute any Transaction
   * @param {Transaction} txn A Mailbox Transaction
   */
  execute(txn) {
    if(!this.isInitalized) throw new Error('Mailbox not initialized, run setConfig')
    const validate = ajv.getSchema('Transaction')

    // Validate basic type errors
    if(!validate(txn)){
      throw new ValidationError(validate.errors)
    }

    /**
     * Map Types of Transactions
     */
    const typesMap = {
      'Transaction.RedeemFromMailbox': this.redeem,
      'Transaction.SendToMailbox': this.send,
    }
    /**
     * Run the appropriate method
     */
    return typesMap[txn.type](txn)
  },

  /**
   * Redeem from this Mailbox
   * @param {RedeemFromMailboxTxn} txn Redeem from Mailbox Transaction
   */
  async redeem(txn){
    if(!this.isInitalized) throw new Error('Mailbox not initialized, run setConfig')

    if(txn.wallet !== this.wallet.address){
      throw new Error('Set the correct wallet before redeeming')
    }
    if(txn.asset !== this.asset){
      throw new Error('Set the correct asset before redeeming')
    }

    const validate = ajv.getSchema('Transaction.RedeemFromMailbox')
    if(!validate(txn)){
      throw new ValidationError(validate.errors)
    }

    try {
      return await redeemAsset({
        client: this.algod,
        asset: this.asset,
        wallets: {
          to: this.wallet,
          from: txn.wallet
        }
      })
    } catch(e){
      // Something went wrong!
      console.log('Failed to redeem asset')
      throw e
    }
  },

  /**
   * Send to this mailbox
   * @param {SendToMailboxTxn} txn Send to Mailbox Transaction
   * @param {Asset} txn.asset Algorand Asset
   * @param {Wallet} txn.from Source Wallet
   * @param {WalletList} txn.to Destination Wallets
   */
  async send({asset = this.asset, from = this.wallet.address, to}){
    if(!this.isInitalized) throw new Error('Mailbox not initialized, run setConfig')

    const validate = ajv.getSchema('Transaction.SendToMailbox')

    // Catch basic validation errors
    if(!validate({asset, from, to})){
      throw new ValidationError(validate.errors)
    }

    // Set the current Wallet
    if(from !== this.wallet){
      this.setWallet(from)
    }

    // Set the current Asset
    if(asset !== this.asset){
      this.setAsset(asset)
    }

    // Run sendAsset
    return await sendAsset({
      client: this.client,
      asset: this.asset,
      wallet: this.wallet,
      csvInput: to
    })
  },

  getHistory
}

export default Mailbox
