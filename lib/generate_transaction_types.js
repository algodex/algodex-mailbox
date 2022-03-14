/////////////////////////////
// Alexander Trefonas      //
// 7/12/2021                //
// Copyright Algodev Inc   //
// All Rights Reserved.    //
/////////////////////////////

const algosdk = require('algosdk')
const helper = require('../lib/helper.js')
const { algodex } = helper.getAlgodex()

const GenerateTransactions = {

  getFundEscrowTxns : async function (client, assetId, assetAmount, fromAccount, toAddress) {
    console.log({client})
    const params = await client.getTransactionParams().do()
    const outerTxns = []

    const escrowSource = helper.buildEscrowFromTemplate(assetId, toAddress, fromAccount.addr)
    const lsig = await algodex.getLsigFromProgramSource(algosdk, client, escrowSource, true)
    const optedIn = await helper.checkOptIn(lsig.address())

    const minBalance = 250000

    const enc = new TextEncoder()
    const note = enc.encode('Hello World') // fixme

    console.log({optedIn})
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
      lsig.address(), undefined, undefined, assetAmount, note, assetId, params, undefined)

    outerTxns.push({
      unsignedTxn: assetFundTxn,
      senderAcct: fromAccount
    })

    return helper.formatTransactionsWithMetadata(
      outerTxns,
      fromAccount.addr,
      'fund',
      {assetId, assetAmount, fromAddr: fromAccount.addr, toAddress},
      assetId
    )
  },

  getCloseEscrowTxns : async function (client, assetId, closeToAddress, senderAddress) {
    //const optedIn = helper.checkOptIn(toAddress);
    console.log({client})
    const params = await client.getTransactionParams().do()
    let outerTxns = []

    const escrowSource = helper.buildEscrowFromTemplate(assetId, closeToAddress, senderAddress)
    const lsig = await algodex.getLsigFromProgramSource(algosdk, client, escrowSource, true)

    const enc = new TextEncoder()
    let note = enc.encode('Hello World') // fixme

    let assetWithdrawTxn = algosdk.makeAssetTransferTxnWithSuggestedParams(lsig.address(),
      closeToAddress, closeToAddress, undefined, 0, note, assetId, params, undefined)

    outerTxns.push({
      unsignedTxn: assetWithdrawTxn,
      lsig: lsig
    })

    let txn = algosdk.makePaymentTxnWithSuggestedParams(
      lsig.address(),
      senderAddress,
      0,
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

  getReturnToSenderTxns : async function (client, assetId, receiverAddress, senderAccount) {
    //const optedIn = helper.checkOptIn(toAddress);
    console.log({client})
    const params = await client.getTransactionParams().do()
    let outerTxns = []

    const escrowSource = helper.buildEscrowFromTemplate(assetId, receiverAddress, 
      senderAccount.addr)
    const lsig = await algodex.getLsigFromProgramSource(algosdk, client, escrowSource, true)

    const enc = new TextEncoder()
    let note = enc.encode('Hello World') // fixme

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
