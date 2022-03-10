// const EscrowTemplate = require('../lib/escrow_template.js')
// const algodex = require('@algodex/algodex-sdk')
// const algodex_api = require('@algodex/algodex-sdk/algodex_api.js')
// const { convertCSVToArray } = require('convert-csv-to-array')
const generateTransactions = require('../lib/generate_transaction_types')
const algosdk = require('algosdk')
const helper = require('../lib/helper.js')

const RedeemAssets = {
  getEscrowBalance: async function (assetId, receiverAddress, senderAddress) {

    const { algodClient } = helper.getAlgodex()

    assetId = parseInt(assetId)

    const outerTxns = await generateTransactions.getCloseEscrowTxns(
      algodClient,
      assetId,
      receiverAddress,
      senderAddress
    )

    const publicKey = outerTxns[0].unsignedTxn.from.publicKey
    const encodedAddress = algosdk.encodeAddress(publicKey)
    return await helper.getFormattedAssetBalance(encodedAddress, assetId, true)
  },

  redeem: async function (assetId, receiverAddress, senderAddress) {
    try {
      const { algodClient } = helper.getAlgodex()

      //const escrowBalance = await this.getEscrowBalance(assetId, receiverAddress);
      //console.log({escrowBalance});
      assetId = parseInt(assetId)

      const outerTxns = await generateTransactions.getCloseEscrowTxns(
        algodClient,
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
      return helper.signAndSendLsigTxns(algodClient, outerTxns)
    } catch (error) {
      return error
    }
  },
}

module.exports = RedeemAssets
