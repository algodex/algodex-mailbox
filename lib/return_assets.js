// const EscrowTemplate = require('../lib/escrow_template.js')
const { convertCSVToArray } = require('convert-csv-to-array')
const generateTransactions = require('../lib/generate_transaction_types')
const helper = require('../lib/helper.js')
const RedeemAssetsHelper = require('../lib/redeem_assets.js')

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
      const toData = convertCSVToArray(csvInput, {
        header: false,
        separator: ',', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
      })
      console.debug({ assetId, originalSender, csvInput })
      console.debug({ toData })

      const allTxns = []
      const txnsForSigning = []

      for (let k = 0; k < toData.length; k++) {
        const data = toData[k]
        const originalSenderAcct = { addr: originalSender }
        const toAddress = data.ToWallet
        const { balance } = await RedeemAssetsHelper.getEscrowBalance(assetId, 
          toAddress, originalSender, false)
        console.debug({balance})
        if (balance == 0) {
          console.debug('balance is 0, continuing')
          return {
            error: true,
            body:{
              message:'Oops!...all the escrow balances are 0'
            }
          }
        }
        const outerTxns = await generateTransactions.getReturnToSenderTxns(
          algodClient,
          assetId,
          toAddress,
          originalSenderAcct
        )
        console.debug({ outerTxns })
        helper.packageUnsignedTransactions(allTxns, txnsForSigning, k, outerTxns)
      }

      const signedAllTxns = await helper.signWithMyAlgo(txnsForSigning, allTxns)

      const confirmedTransactions = await helper.sendAllTransactions(signedAllTxns)

      let transResults = JSON.stringify(confirmedTransactions, null, 2)
      console.debug('trans results after confirmed are: ')
      console.debug(transResults)
      return {
        error: false,
        confirmedTransactions,
      }
    } catch (error) {
      return error
    }
  },
}

module.exports = ReturnAssets
