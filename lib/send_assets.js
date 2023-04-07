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

/* eslint-disable max-len */
/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */
/* eslint-disable @typescript-eslint/no-var-requires */

const { convertCSVToArray } = require('convert-csv-to-array')
const generateTransactions = require('../lib/generate_transaction_types')
const helper = require('../lib/helper.js')
const BigN = require('js-big-decimal')
const validateCSVRows = require('../lib/validate-csv-rows')

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
      return { outerTxns: null }
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
  send: async function (
    assetId,
    fromAddress,
    csvInput,
    escrowPermission,
    walletConnect
  ) {
    try {
      const { algodClient /*, feeReceiverAddress */ } = helper.getAlgodex()
      const decimals = await helper.getAssetDecimals(assetId)

      console.debug({ decimals })
      assetId = parseInt(assetId)
      var lastChar = csvInput[csvInput.length - 1]
      if (lastChar !== '\n') {
        csvInput += '\n'
      }
      csvInput = csvInput.replace(/ /g, '')
      const toData = convertCSVToArray(csvInput, {
        header: false,
        separator: ',',
      })
      const validated = validateCSVRows(toData, true)
      if (validated.error !== false) {
        return validated
      }

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
      // const fromAccount = { addr: fromAddress }
      const fromAccount = { ...fromAddress, addr: fromAddress.address }
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
        } else if (walletConnect) {
          signedAllTxns = await helper.signWithWalletConnect(
            txnsForSigning,
            allTxns,
            walletConnect.current
          )
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
          fundEscrowCount,
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
