const algosdk = require('algosdk')
const ValidationError = require('../ValidationError')
const generateTransactions = require('../generate_transaction_types')
const helper = require('../helper.js')
const ajv = require('../schema')
/**
 * Get Escrow Balance
 *
 * Pure Function
 *
 * @param {Object} props Properties
 * @param {Algodv2} props.client Algosdk Instance
 * @param {string|number} props.asset.id Algorand Asset
 * @param {string} props.wallets.to.address Receiver Wallet Address
 * @param {string} props.wallets.from.address Sender Wallet Address
 * @returns {Promise<*>}
 */
async function getEscrowBalance({
  client,
  asset: {id: assetIdString},
  wallets: {
    to: {address: receiverAddress},
    from: {address: senderAddress}
  }
}) {
  // Validate Client
  if(!(client instanceof algosdk.Algodv2)) throw new Error('Must have a valid sdk client')
  // Validate Asset
  const validateAsset = ajv.getSchema('Asset.Id')
  if(!validateAsset(assetIdString)) throw new ValidationError(validateAsset.errors)
  const assetId = parseInt(assetIdString)

  // Validate Wallets TODO: Move to EscrowWallets Spec
  const validateWallet = ajv.getSchema('Wallet.Address')
  if(!validateWallet(receiverAddress)) throw new ValidationError(validateWallet.errors)
  if(!validateWallet(senderAddress)) throw new ValidationError(validateWallet.errors)

  // Generate Outer Txn
  const outerTxns = await generateTransactions.getCloseEscrowTxns(
    client,
    assetId,
    receiverAddress,
    senderAddress
  )

  const publicKey = outerTxns[0].unsignedTxn.from.publicKey
  const encodedAddress = algosdk.encodeAddress(publicKey)
  return await helper.getFormattedAssetBalance(encodedAddress, assetId, true)
}

module.exports = getEscrowBalance
