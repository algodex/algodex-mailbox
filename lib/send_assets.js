// const EscrowTemplate = require('../lib/escrow_template.js')
const { convertCSVToArray } = require('convert-csv-to-array')
const generateTransactions = require('../lib/generate_transaction_types')
const helper = require('../lib/helper.js')
const BigN = require('js-big-decimal')
//const sendHistoryH = require('../lib/send_history.js');

const SendAssets = {
  send: async function (assetId, fromAddress, csvInput) {
    try {
      const { algodClient } = helper.getAlgodex()

      const decimals = await helper.getAssetDecimals(assetId)

      console.log({ decimals })
      assetId = parseInt(assetId)
      var lastChar = csvInput[csvInput.length - 1]
      if (lastChar !== '\n') {
        csvInput += '\n'
      }
      const toData = convertCSVToArray(csvInput, {
        header: false,
        separator: ',', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
      })
      console.log({ assetId, fromAddress, csvInput })
      console.log({ toData })

      const allTxns = []
      const txnsForSigning = []
      console.log('here11112')
      const params = await algodClient.getTransactionParams().do()
      console.log({ params })

      const getAmount = (formattedAmount, decimals) => {
        const bigFormattedAmount = new BigN(formattedAmount)
        const bigExp = new BigN(10 ** decimals)

        let amount = Math.round(bigFormattedAmount.multiply(bigExp).getValue())
        if (amount <= 0) {
          amount = 0
        }
        return amount
      }

      for (let k = 0; k < toData.length; k++) {
        const data = toData[k]
        console.log({ data })
        const fromAccount = { addr: fromAddress }
        const toAddress = data.ToWallet
        const amount = getAmount(data.Amount, decimals)
        console.log('new amount: ' + amount)
        console.log({ toAddress })
        const outerTxns = await generateTransactions.getFundEscrowTxns(
          algodClient,
          assetId,
          amount,
          fromAccount,
          toAddress
        )
        console.log({ outerTxns })
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

module.exports = SendAssets
