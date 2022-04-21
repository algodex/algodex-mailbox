/* 
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */


// const EscrowTemplate = require('../lib/escrow_template.js')
// const algodex = require('@algodex/algodex-sdk')
// const algodex_api = require('@algodex/algodex-sdk/algodex_api.js')
// const { convertCSVToArray } = require('convert-csv-to-array')
const generateTransactions = require('../lib/generate_transaction_types')
const algosdk = require('algosdk')
const helper = require('../lib/helper.js')

const RedeemAssets = {
  getEscrowBalance: async function (
    assetId,
    receiverAddress,
    senderAddress,
    formatBalance = true
  ) {
    try {
      const { algodClient } = helper.getAlgodex()
      const escrowVersions = helper.getEscrowVersions()

      assetId = parseInt(assetId)
      for (let i = 0; i < escrowVersions.length; i++) {
        // There are multiple escrow versions, so find the first that is non-empty
        const escrowVersion = escrowVersions[i]
        const outerTxns = await generateTransactions.getRedeemEscrowTxns(
          algodClient,
          assetId,
          receiverAddress,
          senderAddress,
          escrowVersion.version
        )

        const publicKey = outerTxns[0].unsignedTxn.from.publicKey
        const encodedAddress = algosdk.encodeAddress(publicKey)
        const { balance, isEmpty } = await helper.getFormattedAssetBalance(
          encodedAddress,
          assetId,
          formatBalance
        )
        console.debug ( {balance, isEmpty, escrowVersion} ) 
        if (!isEmpty || i == escrowVersions.length - 1) {
          // Either this is the first non-empty escrow, or the last one. So return it.
          return {balance, isEmpty, error: false, version: escrowVersion.version, escrowAddress: encodedAddress}
        }
      }
      const data = {message: 'unexpected end of function'}
      throw { data, error: true }
    } catch (error) {
      return error
    }
  },

  redeem: async function (assetId, receiverAddress, senderAddress) {
    try {
      const { algodClient } = helper.getAlgodex()

      const { version } = await this.getEscrowBalance(assetId, receiverAddress, senderAddress)
      console.debug('redeeming with version: ' + version)
      //console.debug({escrowBalance});
      assetId = parseInt(assetId)

      const outerTxns = await generateTransactions.getRedeemEscrowTxns(
        algodClient,
        assetId,
        receiverAddress,
        senderAddress,
        version
      )
      const unsignedTxns = outerTxns.map((outerTxn) => outerTxn.unsignedTxn)
      const groupID = algosdk.computeGroupID(unsignedTxns)
      for (let i = 0; i < outerTxns.length; i++) {
        outerTxns[i].unsignedTxn.group = groupID
      }
      console.debug({ outerTxns })
      return helper.signAndSendLsigTxns(algodClient, outerTxns)
    } catch (error) {
      return error
    }
  },
}

module.exports = RedeemAssets
