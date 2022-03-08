// const getEscrowBalance = require('./getEscrowBalance')
const generateTransactions = require('../lib/generate_transaction_types')
const algosdk = require('algosdk')
const helper = require('../lib/helper.js')

/**
 *
 * @param {Algodv2} client Algod Client
 * @param {Asset} asset Algorand Asset
 * @param {Wallet} receiverWallet Receiver Wallet
 * @param {Wallet} senderWallet Sender Wallet
 * @returns {Promise}
 */
async function redeemAsset(client, asset, receiverWallet, senderWallet) {
  if(!(client instanceof algosdk.Algodv2)) throw new Error('Must have a valid sdk client')
  const {id: assetIdString} = asset
  const {address: receiverAddress} = receiverWallet
  const {address: senderAddress} = senderWallet

  try {
    //const escrowBalance = await getEscrowBalance(client, asset, {address:receiverAddress});
    //console.log({escrowBalance});
    const assetId = parseInt(assetIdString)

    const outerTxns = await generateTransactions.getCloseEscrowTxns(
      client,
      assetId,
      receiverAddress,
      senderAddress
    )
    const unsignedTxns = outerTxns.map((outerTxn) => outerTxn.unsignedTxn)
    const groupID = algosdk.computeGroupID(unsignedTxns)
    for (let i = 0; i < outerTxns.length; i++) {
      outerTxns[i].unsignedTxn.group = groupID
    }
    console.log({ outerTxns })
    return helper.signAndSendLsigTxns(client, outerTxns)
  } catch (error) {
    return error
  }
}

module.exports = redeemAsset
