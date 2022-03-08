const generateTransactions = require('../lib/generate_transaction_types')
const algosdk = require('algosdk')
const helper = require('../lib/helper.js')

/**
 * Get Escrow Balance
 *
 * Pure Function
 *
 * @param {algosdk.Algodv2} client
 * @param {Asset} asset
 * @param {Wallet} receiverWallet
 * @param {Wallet} senderWallet
 * @returns {Promise<*>}
 */
async function getEscrowBalance(client, asset, receiverWallet, senderWallet) {
  if(!(client instanceof algosdk.Algodv2)) throw new Error('Must have a valid sdk client')

  // Destructure Standard Objects
  const {id: assetIdString} = asset
  const {address: receiverAddress} = receiverWallet
  const {address: senderAddress} = senderWallet
  const assetId = parseInt(assetIdString)

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
