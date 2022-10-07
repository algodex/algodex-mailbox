/* 
 * Algodex Service 
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
const { convertCSVToArray } = require('convert-csv-to-array')
const generateTransactions = require('../lib/generate_transaction_types')
const helper = require('../lib/helper.js')
const RedeemAssetsHelper = require('../lib/redeem_assets.js')
const validateCSVRows = require('../lib/validate-csv-rows')

const ReturnAssets = {
  returnAssetsToSender: async function (assetId, originalSender, csvInput) {
    try {
      const { algodClient } = helper.getAlgodex()

      const decimals = await helper.getAssetDecimals(assetId)

      console.debug({ decimals })
      assetId = parseInt(assetId)
      var lastChar = csvInput[csvInput.length - 1]
      if (lastChar !== '\n') {
        csvInput += '\n'
      }
      csvInput = csvInput.replace(/ /g,'')
      const toData = convertCSVToArray(csvInput, {
        header: false,
        separator: ',', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
      })
      const validated = validateCSVRows(toData, false)
      if (validated.error !== false) {
        return validated
      }
      console.debug({ assetId, originalSender, csvInput })
      console.debug({ toData })

      const allTxns = []
      const txnsForSigning = []

      for (let k = 0; k < toData.length; k++) {
        const data = toData[k]
        const originalSenderAcct = { addr: originalSender }
        const toAddress = data.ToWallet
        const { balance, version } = await RedeemAssetsHelper.getEscrowBalance(
          assetId,
          toAddress,
          originalSender,
          false
        )
        console.debug({ balance })
        if (balance == 0) {
          console.debug('balance is 0, continuing')
          continue
        }
        const outerTxns = await generateTransactions.getReturnToSenderTxns(
          algodClient,
          assetId,
          toAddress,
          originalSenderAcct,
          version
        )
        console.debug({ outerTxns })
        helper.packageUnsignedTransactions(
          allTxns,
          txnsForSigning,
          k,
          outerTxns,
          toData.length
        )
      }

      if (txnsForSigning.length > 0) {
        let signedAllTxns
        if (typeof window.end2end !== 'undefined') {
          signedAllTxns = await helper.signWithSDK(txnsForSigning, allTxns)
        } else {
          signedAllTxns = await helper.signWithMyAlgo(txnsForSigning, allTxns)
        }
        const confirmedTransactions = await helper.sendAllTransactions(
          signedAllTxns,
          'return'
        )

        let transResults = JSON.stringify(confirmedTransactions, null, 2)
        console.debug('trans results after confirmed are: ')
        console.debug(transResults)
        return {
          error: false,
          confirmedTransactions,
        }
      } else {
        return {
          error: true,
          body: {
            message: 'Oops!...all the escrow balances are 0',
          },
        }
      }
    } catch (error) {
      return error
    }
  },
}

module.exports = ReturnAssets
