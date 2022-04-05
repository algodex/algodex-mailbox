/////////////////////////////
// Alexander Trefonas      //
// 7/12/2021                //
// Copyright Algodev Inc   //
// All Rights Reserved.    //
/////////////////////////////

const algosdk = require('algosdk')
const helper = require('../lib/helper.js')
const { algodex } = helper.getAlgodex()

let params = undefined
let paramsUnixTimeSecs = undefined

const GenerateTransactions = {
  getParams : async function(client) {
    const currentUnixTimeSecs = Date.now() / 1000
    if (params !== undefined && 
    ((currentUnixTimeSecs - paramsUnixTimeSecs) < 5 && paramsUnixTimeSecs !== undefined)) {
      // Return cached params if not older than 5 seconds
      return { ...params }
    }
    params = await client.getTransactionParams().do()
    paramsUnixTimeSecs = currentUnixTimeSecs
    params.flatFee = true
    params.fee = 1000

    return { ...params }
  },
  getSimpleSendAssetTxn : async function (client, assetId, assetAmount, fromAccount, toAddress) {
    const params = await this.getParams(client)
    const outerTxns = []
    let assetSendTxn = algosdk.makeAssetTransferTxnWithSuggestedParams(fromAccount.addr,
      toAddress, undefined, undefined, assetAmount, undefined, assetId, params, undefined)

    outerTxns.push({
      unsignedTxn: assetSendTxn,
      senderAcct: fromAccount
    })

    const sendType = 'direct'
    return await helper.formatTransactionsWithMetadata(
      outerTxns,
      fromAccount.addr,
      'fund',
      {assetId, assetAmount, fromAddr: fromAccount.addr, toAddress, sendType},
      assetId,
      assetAmount,
      toAddress
    )
  },
  getFundEscrowTxns : async function (client, assetId, assetAmount, fromAccount, toAddress) {
    const params = await this.getParams(client)
    const doubleFeeParams = await this.getParams(client)
    doubleFeeParams.fee = 2000
    const zeroFeeParams = await this.getParams(client)
    zeroFeeParams.fee = 0

    const outerTxns = []

    const escrowVersion = process.env.NEXT_PUBLIC_USE_ESCROW_VERSION || 'latest'
    const escrowSource = helper.buildEscrowFromTemplate(assetId, toAddress, fromAccount.addr, 
      escrowVersion)
    const lsig = await algodex.getLsigFromProgramSource(algosdk, client, escrowSource, true)
    const optedIn = await helper.checkOptIn(lsig.address(), parseInt(assetId))

    const minBalance = 250000

    const note = undefined

    console.debug({optedIn})
    if (!optedIn) {

      const payTxn = algosdk.makePaymentTxnWithSuggestedParams(
        fromAccount.addr,
        lsig.address(),
        minBalance,
        undefined,
        note,
        params
      )

      outerTxns.push({
        unsignedTxn: payTxn,
        senderAcct: fromAccount
      })

      let assetOptInTxn = algosdk.makeAssetTransferTxnWithSuggestedParams(lsig.address(),
        lsig.address(), undefined, undefined, 0, note, assetId, params, undefined)

      outerTxns.push({
        unsignedTxn: assetOptInTxn,
        lsig: lsig
      })
    }

    let assetFundTxn = algosdk.makeAssetTransferTxnWithSuggestedParams(fromAccount.addr,
      lsig.address(), undefined, undefined, assetAmount, note, assetId, doubleFeeParams, undefined)

    outerTxns.push({
      unsignedTxn: assetFundTxn,
      senderAcct: fromAccount
    })

    const noteTxn = algosdk.makePaymentTxnWithSuggestedParams(
      lsig.address(),
      toAddress,
      0,
      undefined,
      note,
      zeroFeeParams
    )

    outerTxns.push({
      unsignedTxn: noteTxn,
      lsig: lsig
    })

    const sendType = 'escrow'
    return await helper.formatTransactionsWithMetadata(
      outerTxns,
      fromAccount.addr,
      'fund',
      {assetId, assetAmount, fromAddr: fromAccount.addr, toAddress, sendType},
      assetId,
      assetAmount,
      toAddress
    )
  },

  getRedeemEscrowTxns : async function (client, assetId, closeToAddress, senderAddress, 
    escrowVersion) {
    const { feeReceiverAddress } = helper.getAlgodex()
    const params = await this.getParams(client)
    let outerTxns = []

    const escrowSource = helper.buildEscrowFromTemplate(assetId, closeToAddress, senderAddress, 
      escrowVersion)
    const lsig = await algodex.getLsigFromProgramSource(algosdk, client, escrowSource, true)

    let note = undefined

    let assetWithdrawTxn = algosdk.makeAssetTransferTxnWithSuggestedParams(lsig.address(),
      closeToAddress, closeToAddress, undefined, 0, note, assetId, params, undefined)

    outerTxns.push({
      unsignedTxn: assetWithdrawTxn,
      lsig: lsig
    })

    let txn = algosdk.makePaymentTxnWithSuggestedParams(
      lsig.address(),
      feeReceiverAddress,
      50000,
      senderAddress,
      note,
      params
    )
    outerTxns.push({
      unsignedTxn: txn,
      lsig: lsig
    })


    return outerTxns
  },

  getReturnToSenderTxns : async function (client, assetId, receiverAddress, 
    senderAccount, escrowVersion) {
    const params = await this.getParams(client)
    let outerTxns = []

    const escrowSource = helper.buildEscrowFromTemplate(assetId, receiverAddress, 
      senderAccount.addr, escrowVersion)
    const lsig = await algodex.getLsigFromProgramSource(algosdk, client, escrowSource, true)

    let note = undefined

    let assetWithdrawTxn = algosdk.makeAssetTransferTxnWithSuggestedParams(lsig.address(),
      senderAccount.addr, senderAccount.addr, undefined, 0, note, assetId, params, undefined)

    let proofTxn = algosdk.makePaymentTxnWithSuggestedParams(
      senderAccount.addr,
      senderAccount.addr,
      0,
      undefined,
      note,
      params
    )

    outerTxns.push({
      unsignedTxn: assetWithdrawTxn,
      lsig: lsig
    })

    let txn = algosdk.makePaymentTxnWithSuggestedParams(
      lsig.address(),
      senderAccount.addr,
      0,
      senderAccount.addr,
      note,
      params
    )

    outerTxns.push({
      unsignedTxn: txn,
      lsig: lsig
    })

    outerTxns.push({
      unsignedTxn: proofTxn,
      senderAcct: senderAccount
    })


    return outerTxns
  }
}

module.exports = GenerateTransactions
