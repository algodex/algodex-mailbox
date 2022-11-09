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

/* 
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */
/* eslint-disable @typescript-eslint/no-var-requires */


// const EscrowTemplate = require('../lib/escrow_template.js')
// const algodex = require('@algodex/algodex-sdk')
// const algodex_api = require('@algodex/algodex-sdk/algodex_api.js')
// const { convertCSVToArray } = require('convert-csv-to-array')
const generateTransactions = require('../lib/generate_transaction_types')
const algosdk = require('algosdk')
const helper = require('../lib/helper.js')

const RedeemAssets = {
  getEscrowBalanceFromVersion: async function (
    escrowVersion,
    assetId,
    receiverAddress,
    senderAddress,
    formatBalance = true
  ) {
    const { algodClient, environment } = helper.getAlgodex()
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
    const algoExplorerLink = environment == 'mainnet' ? 
      'https://algoexplorer.io/address/' + encodedAddress :
      'https://testnet.algoexplorer.io/address/' + encodedAddress
    return {balance, isEmpty, error: false, version: escrowVersion.version, 
      escrowAddress: encodedAddress, algoExplorerLink}

  },
  getEscrowBalance: async function (
    assetId,
    receiverAddress,
    senderAddress,
    formatBalance = true
  ) {
    try {
      const escrowVersions = helper.getEscrowVersions()

      assetId = parseInt(assetId)
      for (let i = 0; i < escrowVersions.length; i++) {
        // There are multiple escrow versions, so find the first that is non-empty
        const escrowVersion = escrowVersions[i]

        const retVals = await this.getEscrowBalanceFromVersion(
          escrowVersion,
          assetId,
          receiverAddress,
          senderAddress,
          formatBalance
        )

        if (!retVals.isEmpty) {
          return retVals
        }
      }
      const escrowVersion = escrowVersions[0]

      return await this.getEscrowBalanceFromVersion(escrowVersion,
        assetId,
        receiverAddress,
        senderAddress,
        formatBalance)

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
