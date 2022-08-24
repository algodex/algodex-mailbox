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
