/* eslint-disable max-len */
/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

const { convertCSVToArray } = require('convert-csv-to-array')
const generateTransactions = require('../lib/generate_transaction_types')
const helper = require('../lib/helper.js')
const BigN = require('js-big-decimal')

const SendAssets = {
  getMailboxSendTransactions: async function (
    algodClient,
    assetId,
    amount,
    fromAccount,
    toAddress,
    escrowPermission
  ) {
    const isOptedIn = process.env.NEXT_PUBLIC_ALWAYS_SEND_TO_ESCROW
      ? false
      : await helper.checkOptIn(toAddress, assetId)
    if (isOptedIn) {
      return {
        outerTxns: await generateTransactions.getSimpleSendAssetTxn(
          algodClient,
          assetId,
          amount,
          fromAccount,
          toAddress
        ),
        fundEscrow: false,
      }
    }
    if (
      !isOptedIn &&
      !escrowPermission &&
      !process.env.NEXT_PUBLIC_ALWAYS_SEND_TO_ESCROW
    ) {
      return
    }

    return {
      outerTxns: await generateTransactions.getFundEscrowTxns(
        algodClient,
        assetId,
        amount,
        fromAccount,
        toAddress
      ),
      fundEscrow: true,
    }
  },
  send: async function (assetId, fromAddress, csvInput, escrowPermission) {
    try {
      const { algodClient /*, feeReceiverAddress */ } = helper.getAlgodex()
      const decimals = await helper.getAssetDecimals(assetId)

      console.debug({ decimals })
      assetId = parseInt(assetId)
      var lastChar = csvInput[csvInput.length - 1]
      if (lastChar !== '\n') {
        csvInput += '\n'
      }
      const toData = convertCSVToArray(csvInput, {
        header: false,
        separator: ',',
      })
      console.debug({ assetId, fromAddress, csvInput })
      console.debug({ toData })

      const allTxns = []
      const txnsForSigning = []

      const getAmount = (formattedAmount, decimals) => {
        const bigFormattedAmount = new BigN(formattedAmount)
        const bigExp = new BigN(10 ** decimals)

        let amount = Math.round(bigFormattedAmount.multiply(bigExp).getValue())
        if (amount <= 0) {
          amount = 0
        }
        return amount
      }

      // let simpleAssetTransferCount = 0
      const fromAccount = { addr: fromAddress }
      let fundEscrowCount = 0

      for (let k = 0; k < toData.length; k++) {
        const data = toData[k]
        console.debug({ data })
        const toAddress = data.ToWallet
        const amount = getAmount(data.Amount, decimals)
        console.debug('new amount: ' + amount)
        console.debug({ toAddress })
        const { outerTxns, fundEscrow } = await this.getMailboxSendTransactions(
          algodClient,
          assetId,
          amount,
          fromAccount,
          toAddress,
          escrowPermission
        )
        if (fundEscrow) {
          fundEscrowCount++
        }
        // if (outerTxns.length == 1) {
        //   simpleAssetTransferCount++
        // }
        console.debug({ outerTxns })
        if (outerTxns) {
          helper.packageUnsignedTransactions(
            allTxns,
            txnsForSigning,
            k,
            outerTxns,
            toData.length
          )
        }
      }

      // UNCOMMENT TO ENABLE FEES FOR DIRECT TRANSFERS
      // Add operator fee transaction for direct transfers of assets
      // if (simpleAssetTransferCount > 0) {
      //   const operatorFee = simpleAssetTransferCount * 50000 // 0.05 algo fee to operator per txn
      //   const outerSendTxn =
      //     await generateTransactions.getSimpleSendAlgosTransaction(
      //       algodClient,
      //       operatorFee,
      //       fromAccount,
      //       feeReceiverAddress
      //     )
      //   helper.packageUnsignedTransactions(
      //     allTxns,
      //     txnsForSigning,
      //     toData.length,
      //     outerSendTxn
      //   )
      // }
      if (txnsForSigning.length > 0) {
        let signedAllTxns
        if (typeof window.end2end !== 'undefined') {
          signedAllTxns = await helper.signWithSDK(txnsForSigning, allTxns)
        } else {
          signedAllTxns = await helper.signWithMyAlgo(txnsForSigning, allTxns)
        }
        const confirmedTransactions = await helper.sendAllTransactions(
          signedAllTxns,
          'send'
        )

        let transResults = JSON.stringify(confirmedTransactions, null, 2)
        console.debug('trans results after confirmed are: ')
        console.debug(transResults)
        return {
          error: false,
          confirmedTransactions,
          fundEscrowCount
        }
      } else {
        return {
          error: 'info',
          message: 'None of the address provided is opted-in to this asset',
        }
      }
    } catch (error) {
      return error
    }
  },
}

module.exports = SendAssets
