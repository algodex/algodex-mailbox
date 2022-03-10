// const EscrowTemplate = require('../lib/escrow_template.js')
const algodex = require('@algodex/algodex-sdk')
const algodex_api = require('@algodex/algodex-sdk/algodex_api.js')
const { convertCSVToArray } = require('convert-csv-to-array')
const generateTransactions = require('../lib/generate_transaction_types')
const algosdk = require('algosdk')
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
      let groupCount = 0
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

        for (let i = 0; i < outerTxns.length; i++) {
          const outerTxn = outerTxns[i]
          outerTxns[i] = helper.convertToMyAlgoTxn(outerTxn)
        }
        const unsignedTxns = outerTxns.map((outerTxn) => outerTxn.unsignedTxn)

        const groupID = algosdk.computeGroupID(unsignedTxns)

        for (let i = 0; i < outerTxns.length; i++) {
          //outerTxns[i] = helper.convertToMyAlgoTxn(outerTxns[i]);
          outerTxns[i].unsignedTxn.group = groupID
          outerTxns[i].groupNum = groupCount
          outerTxns[i].innerIndex = i
          allTxns.push(outerTxns[i])
          if (!outerTxns[i].lsig) {
            txnsForSigning.push(outerTxns[i])
          }
        }

        console.log({ allTxns, txnsForSigning })

        groupCount++
        //const signedTxns = helper.signAndSendWithMyAlgo(algodClient, outerTxns);
      }

      const innerTxnsForSigning = txnsForSigning.map((txn) => txn.unsignedTxn)
      console.log('printingzzzzz')
      //console.log({innerTxnsForSigning});
      // TODO: avoid globals, rely on bundler
      // eslint-disable-next-line no-undef
      const signedTxnsFromUser = await myAlgoWallet.signTransaction(
        innerTxnsForSigning
      )
      console.log({ signedTxnsFromUser })
      //const outerGroupTo
      for (let i = 0; i < txnsForSigning.length; i++) {
        txnsForSigning[i].signedTxn = signedTxnsFromUser[i].blob
      }
      for (let i = 0; i < allTxns.length; i++) {
        const trans = allTxns[i]
        if (trans.lsig) {
          let signedTxn = algosdk.signLogicSigTransactionObject(
            trans.unsignedTxn,
            trans.lsig
          )
          trans.signedTxn = signedTxn.blob
        }
      }

      console.log({ txnsForSigning, allTxns })

      const confirmedTransactions = await helper.sendAllTransactions(allTxns)

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
