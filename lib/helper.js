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

const EscrowTemplateV1 = require('../lib/escrow_template.js')
const EscrowTemplateV2 = require('../lib/escrow_template_v2.js')
const algodexImport = require('@algodex/algodex-sdk')
const testHelper = require('@algodex/algodex-sdk/test_helper.js')
const algodexApiImport = require('@algodex/algodex-sdk/algodex_api.js')
const algosdk = require('algosdk')
const axios = require('axios').default
const BigN = require('js-big-decimal')
const events = require('./events')

//Algonameservice SDK
import { ANS } from '@algonameservice/sdk'

// These should be ordered from latest to oldest
const escrowVersions = [
  { version: 2, escrowLib: EscrowTemplateV2 },
  { version: 1, escrowLib: EscrowTemplateV1 },
]

const cachedAssetInfoResp = [] //stores cached indexer info

const Helper = {
  envObjs: null,
  getAlgodex: function () {
    if (!this.envObjs) {
      const environment = this.getEnvironment()
      const algodexEnvironment = this.getAlgodexEnvironment()
      const algodClient = algodexImport.initAlgodClient(algodexEnvironment)
      algodexImport.initIndexer(algodexEnvironment)
      algodexApiImport.initAlgodClient(algodexEnvironment)
      algodexApiImport.initIndexer(algodexEnvironment)
      const feeReceiverAddress =
        process.env.NEXT_PUBLIC_FEE_RECEIVER_ADDRESS ||
        'U5XMP23KCHXNWW77WV32JRYM5XHQMTDZ7JMODDIGSJDSHUR6RYHVRH62AY'
      const indexerServer =
        this.getEnvironment() === 'mainnet'
          ? 'https://algoindexer.algoexplorerapi.io'
          : 'https://algoindexer.testnet.algoexplorerapi.io'

      const purestakeIndexerServer =
        process.env.NEXT_PUBLIC_CUSTOM_INDEXER_SERVER

      const purestakeClientServer =
        this.getEnvironment() === 'mainnet'
          ? 'https://mainnet-algorand.api.purestake.io/ps2'
          : 'https://testnet-algorand.api.purestake.io/ps2'
      const indexerPort = ''
      const indexerToken = ''

      const purestakeIndexerToken = process.env.NEXT_PUBLIC_CUSTOM_INDEXER_TOKEN
      const purestakeIndexerPort = process.env.NEXT_PUBLIC_CUSTOM_INDEXER_PORT

      this.envObjs = {
        algodex: algodexImport,
        algodexApi: algodexApiImport,
        algodClient,
        indexerServer,
        indexerPort,
        indexerToken,
        environment,
        algodexEnvironment,
        feeReceiverAddress,
        purestakeIndexerServer,
        purestakeIndexerToken,
        purestakeClientServer,
        purestakeIndexerPort,
      }
    }
    return this.envObjs
  },
  getEscrowVersions: function () {
    return escrowVersions
  },
  buildEscrowFromTemplate: function (
    assetId,
    receiverAddress,
    senderAddress,
    escrowVersion = 'latest'
  ) {
    const { feeReceiverAddress } = this.getAlgodex()
    if (
      isNaN(assetId) ||
      !receiverAddress ||
      receiverAddress.length === 0 ||
      !senderAddress ||
      senderAddress.length === 0 ||
      !feeReceiverAddress ||
      feeReceiverAddress.length === 0
    ) {
      throw 'one or more null arguments in buildDelegateTemplateFromArgs!'
    }
    console.debug('buildEscrowFromTemplate escrowVersion: ' + escrowVersion)
    let escrowTemplate = null
    if (escrowVersion == 'latest') {
      escrowTemplate = escrowVersions[0].escrowLib.getTealTemplate()
    } else {
      escrowTemplate = escrowVersions
        .find((templ) => templ.version == escrowVersion)
        .escrowLib.getTealTemplate()
    }

    let res = escrowTemplate.split('<assetId>').join(assetId)
    res = res.split('<feeReceiverAddr>').join(feeReceiverAddress)
    res = res.split('<senderAddr>').join(senderAddress)
    res = res.split('<receiverAddr>').join(receiverAddress)

    return res
  },
  getAssetInfo: async function (assetId) {
    const { indexerServer, indexerPort, indexerToken } = this.getAlgodex()
    const key = `assetId:${assetId}`
    if (key in cachedAssetInfoResp) {
      return cachedAssetInfoResp[key]
    }
    const response = await axios.get(
      indexerServer + indexerPort + '/v2/assets/' + assetId,
      { headers: { 'X-Algo-API-Token': indexerToken } }
    )
    cachedAssetInfoResp[key] = response

    return response
  },
  getAssetUnitName: async function (assetId) {
    const response = await this.getAssetInfo(assetId)
    return response.data.asset.params['unit-name']
  },
  getAssetDecimals: async function (assetId) {
    const response = await this.getAssetInfo(assetId)
    return response.data.asset.params.decimals
  },
  checkOptIn: async function (addr, assetId) {
    const { algodex } = this.getAlgodex()
    let accountInfo = await algodex.getAccountInfo(addr)
    if (!accountInfo.assets) {
      return false
    }
    for (let i = 0; i < accountInfo.assets.length; i++) {
      let asset = accountInfo.assets[i]
      if (asset['asset-id'] === assetId) {
        return true
      }
    }
    return false
  },

  getAssetBalance: async function (addr, assetId) {
    const { algodex } = this.getAlgodex()
    let accountInfo = await algodex.getAccountInfo(addr)
    let walletAssetAmount = 0
    if (accountInfo['assets'] && accountInfo['assets'].length > 0) {
      for (let i = 0; i < accountInfo['assets'].length; i++) {
        let asset = accountInfo['assets'][i]
        if (asset['asset-id'] === assetId) {
          walletAssetAmount = asset['amount']
          break
          //console.debug("execAccountInfo: " + execAccountInfo);
        }
      }
    }
    return walletAssetAmount
  },

  packageUnsignedTransactions: function (
    allTxns,
    txnsForSigning,
    groupCount,
    outerTxns,
    totalLength
  ) {
    for (let i = 0; i < outerTxns.length; i++) {
      const outerTxn = outerTxns[i]
      outerTxns[i] =
        typeof window !== 'undefined' && typeof window.end2end !== 'undefined'
          ? outerTxn
          : this.convertToMyAlgoTxn(outerTxn)
      // events.emit('getting-balance', {
      //   status:
      //     'Looking up wallet balances & signing logical signatures... (Step 1/4)',
      //   progress: i,
      //   total: outerTxns.length,
      // })
    }
    const unsignedTxns = outerTxns.map((outerTxn) => outerTxn.unsignedTxn)

    const groupID = algosdk.computeGroupID(unsignedTxns)

    for (let i = 0; i < outerTxns.length; i++) {
      outerTxns[i].unsignedTxn.group = groupID
      outerTxns[i].groupNum = groupCount
      outerTxns[i].innerIndex = i
      allTxns.push(outerTxns[i])
      if (!outerTxns[i].lsig) {
        txnsForSigning.push(outerTxns[i])
        events.emit('sign-with-my-algo', {
          status:
            'Sending transactions to the MyAlgo Connect bridge for signing... (Step 2/4)',
          progress: groupCount,
          total: totalLength,
        })
      }
    }

    console.debug({ allTxns, txnsForSigning })

    return { allTxns, txnsForSigning, groupCount, outerTxns, totalLength }
  },
  /**
   * Sign Object Literal Transactions
   * @param txnsForSigning
   * @param allTxns
   * @param totalLength
   * @return {Promise<*>}
   */
  signWithSDK: async function (txnsForSigning, allTxns, totalLength) {
    events.emit('sign-with-my-algo', {
      status: 'Waiting for user signature via the MyAlgo GUI.. (Step 3/4)',
      progress: 0,
      total: totalLength,
    })
    const signedTxnsFromUser = txnsForSigning.map((txn) => {
      return algosdk.signTransaction(
        txn.unsignedTxn,
        algosdk.mnemonicToSecretKey(window.end2end.wallet.mnemonic).sk
      )
    })

    console.debug({ signedTxnsFromUser })
    //const outerGroupTo
    for (let i = 0; i < txnsForSigning.length; i++) {
      txnsForSigning[i].signedTxn = signedTxnsFromUser[i].blob
      events.emit('sign-with-my-algo', {
        status: 'Waiting for user signature via the MyAlgo GUI... (Step 3/4)',
        progress: i,
        total: totalLength,
      })
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
    events.emit('sign-with-my-algo', { status: 'Complete' })
    return allTxns
  },
  signWithMyAlgo: async function (txnsForSigning, allTxns, totalLength) {
    events.emit('sign-with-my-algo', {
      status: 'Waiting for user signature via the MyAlgo GUI.. (Step 3/4)',
      progress: 0,
      total: totalLength,
    })
    const innerTxnsForSigning = txnsForSigning.map((txn) => txn.unsignedTxn)
    //console.debug({innerTxnsForSigning});
    // TODO: avoid globals, rely on bundler
    // eslint-disable-next-line no-undef
    const signedTxnsFromUser = await myAlgoWallet.signTransaction(
      innerTxnsForSigning
    )
    console.debug({ signedTxnsFromUser })
    //const outerGroupTo
    for (let i = 0; i < txnsForSigning.length; i++) {
      txnsForSigning[i].signedTxn = signedTxnsFromUser[i].blob
      events.emit('sign-with-my-algo', {
        status: 'Waiting for user signature via the MyAlgo GUI... (Step 3/4)',
        progress: i,
        total: totalLength,
      })
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
    events.emit('sign-with-my-algo', { status: 'Complete' })
    return allTxns
  },
  sendAllTransactions: async function (allTransList, mode) {
    const highestGroupNum =
      allTransList.reduce((prev, current) =>
        prev.groupNum > current.groupNum ? prev : current
      ).groupNum + 1
    events.emit('send-all-transactions', {
      status: `${
        mode == 'return'
          ? 'Returning the assets to the sender'
          : 'Sending the transactions to the recipients on the blockchain'
      }... (Step 4/4)`,
      progress: 0,
      total: highestGroupNum,
    })
    const { algodexApi, algodex, algodClient } = this.getAlgodex()

    let signedTxns = []
    let sentTxns = []

    let lastGroupNum = -1
    for (let i = 0; i < allTransList.length; i++) {
      // loop to end of array
      const currentGroupNum = allTransList[i]['groupNum'] + 1
      if (lastGroupNum !== allTransList[i]['groupNum']) {
        // If at beginning of new group, send last batch of transactions
        if (signedTxns.length > 0) {
          console.debug({ signedTxns })
          try {
            algodex.printTransactionDebug(signedTxns)
            let txn = await algodClient.sendRawTransaction(signedTxns).do()
            sentTxns.push(txn.txId)
            console.debug('sent: ' + txn.txId)
            events.emit('send-all-transactions', {
              status: `${
                mode == 'return'
                  ? 'Returning the assets to the sender'
                  : 'Sending the transactions to the recipients on the blockchain'
              }... (Step 4/4)`,
              progress: currentGroupNum,
              total: highestGroupNum,
            })
          } catch (e) {
            console.debug(e)
            return e.response
          }
        }
        // send batch of grouped transactions
        signedTxns = []
        lastGroupNum = allTransList[i]['groupNum']
      }

      signedTxns.push(allTransList[i]['signedTxn'])

      if (i === allTransList.length - 1) {
        // If at end of list send last batch of transactions
        if (signedTxns.length > 0) {
          try {
            algodex.printTransactionDebug(signedTxns)
            const DO_SEND = true
            if (DO_SEND) {
              let txn = await algodClient.sendRawTransaction(signedTxns).do()
              sentTxns.push(txn.txId)
              events.emit('send-all-transactions', {
                status: `${
                  mode == 'return'
                    ? 'Returning the assets to the sender'
                    : 'Sending the transactions to the recipients on the blockchain'
                }... (Step 4/4)`,
                progress: currentGroupNum,
                total: highestGroupNum,
              })
              console.debug('sent: ' + txn.txId)
            } else {
              console.debug('skipping sending for debugging reasons!!!')
            }
          } catch (e) {
            console.debug(e)
            return e.response
          }
        }
        break
      }
    }

    console.debug('going to wait for confirmations')

    let waitConfirmedPromises = []

    for (let i = 0; i < sentTxns.length; i++) {
      console.debug('creating promise to wait for: ' + sentTxns[i])
      const confirmPromise = algodex.waitForConfirmation(sentTxns[i])
      waitConfirmedPromises.push(confirmPromise)
    }

    console.debug('final9 trans are: ')
    // console.debug(alTransList);
    // console.debug(transNeededUserSigList);

    console.debug('going to send all ')
    const confirmedTransactions = await algodexApi.allSettled(
      waitConfirmedPromises
    )
    console.debug('all are confirmed now')
    events.emit('send-all-transactions', {
      status: 'Transactions Sent!',
      progress: highestGroupNum,
      total: highestGroupNum,
    })
    return confirmedTransactions
  },
  getFormattedAssetBalanceFromAmountAndDecimals: function (
    amount,
    assetId,
    assetDecimals
  ) {
    const bAssetBalance = new BigN(amount)
    const bAssetDecimalPow = new BigN(10 ** assetDecimals)
    const bFormattedVal = bAssetBalance.divide(bAssetDecimalPow, 30)
    return bFormattedVal.round(assetDecimals).getValue()
  },

  getAlgodexEnvironment: function () {
    return process.env.NEXT_PUBLIC_ALGODEX_ENVIRONMENT || 'public_test'
  },

  getEnvironment: function () {
    const algodexEnvironment = this.getAlgodexEnvironment()
    if (algodexEnvironment === 'production') {
      return 'mainnet'
    }
    return 'testnet'
  },
  getShareableRedeemLink: function (
    walletAddr,
    assetId,
    receiverAddress = null
  ) {
    let webURL = ''
    if (typeof window !== 'undefined') {
      webURL = `${window.location.protocol}//${window.location.host}`
    } else {
      webURL = 'https://mailbox.algodex.com'
    }
    let link = `${webURL}/redeem-assets/?senderAddress=${walletAddr}&assetId=${assetId}`
    if (receiverAddress) {
      link += `&receiverAddress=${receiverAddress}`
    }
    return link
  },
  getFormattedAssetAmount: async function (
    assetBalance,
    assetId,
    showName = false
  ) {
    try {
      let assetDecimals = await this.getAssetDecimals(assetId)
      const formattedBalance =
        this.getFormattedAssetBalanceFromAmountAndDecimals(
          assetBalance,
          assetId,
          assetDecimals
        )
      const unitName = showName
        ? ' ' + (await this.getAssetUnitName(assetId))
        : ''
      return {
        error: false,
        balance: formattedBalance + unitName,
        isEmpty: assetBalance == 0,
      }
    } catch (error) {
      return error
    }
  },

  getFormattedAssetBalance: async function (addr, assetId, showName = false) {
    try {
      //TODO: fetch in parallel
      let assetBalance = await this.getAssetBalance(addr, assetId)
      return this.getFormattedAssetAmount(assetBalance, assetId, showName)
    } catch (error) {
      return error.response
    }
  },
  runNegativeTest: async function (
    config,
    client,
    outerTxns,
    negTestTxnConfig
  ) {
    console.debug('STARTING runNegativeTest')
    console.debug({ negTestTxnConfig })

    const {
      txnNum,
      field,
      val,
      negTxn,
      innerNum,
      configKeyForVal,
      txnKeyForVal,
      txnNumForVal,
    } = negTestTxnConfig
    const txn = outerTxns[txnNum]

    const getVal = () => {
      if (configKeyForVal !== undefined) {
        console.debug({ configKeyForVal, config })
        return config[configKeyForVal]
      }
      if (txnKeyForVal !== undefined) {
        return outerTxns[txnNumForVal].unsignedTxn[txnKeyForVal]
      }
      return val
    }

    if (field === 'type' && val === 'axfer') {
      outerTxns[txnNum].unsignedTxn['assetIndex'] = config.assetId
    }

    if (!negTxn) {
      if (innerNum === undefined) {
        outerTxns[txnNum].unsignedTxn[field] = getVal()
        if (txnKeyForVal === 'from' && field === 'from') {
          delete outerTxns[txnNum].lsig
          delete outerTxns[txnNum].senderAcct

          if (outerTxns[txnNumForVal].lsig !== undefined) {
            outerTxns[txnNum].lsig = outerTxns[txnNumForVal].lsig
          }
          if (outerTxns[txnNumForVal].senderAcct !== undefined) {
            outerTxns[txnNum].senderAcct = outerTxns[txnNumForVal].senderAcct
          }
        }
      } else {
        outerTxns[txnNum].unsignedTxn[field][innerNum] = getVal()
      }
    } else {
      outerTxns[txnNum] = negTxn
    }
    //const t = outerTxns[0];
    console.debug({ txn })

    let signedTxns = testHelper.groupAndSignTransactions(outerTxns)

    try {
      await testHelper.sendAndCheckConfirmed(client, signedTxns)
    } catch (e) {
      // An exception is expected. Return true for success
      return testHelper.checkFailureType(e)
    }

    return false
  },

  formatTransactionsWithMetadata: async function (
    sendNote,
    txns,
    senderAddr,
    txnType,
    sendEntry,
    assetId,
    assetAmount,
    receiverAddress
  ) {
    let acceptedTxnTypes = [
      'initialFundEscrow',
      'addToEscrow',
      'withdraw',
      'sendDirect',
    ]
    function OrderTypeException(message) {
      this.message = message
      this.name = 'OrderTypeException'
    }
    OrderTypeException.prototype = Error.prototype
    if (!acceptedTxnTypes.includes(txnType)) {
      throw new OrderTypeException(
        `Invalid order type, please input one of the following: ${acceptedTxnTypes}`
      )
    }
    let enc = new TextEncoder()
    let groupMetadata = {}
    groupMetadata[`AlgodexMailbox-${senderAddr}-${assetId}-${txnType}`] =
      sendEntry
    const retTxns = txns.map((txn) => {
      txn.unsignedTxn.note = enc.encode(JSON.stringify(groupMetadata))
      return txn
    })

    if (sendNote && (txnType === 'fund' || txnType === 'addToEscrow')) {
      const formattedAmount = await this.getFormattedAssetAmount(
        assetAmount,
        assetId,
        true
      )
      const shareLink = this.getShareableRedeemLink(
        senderAddr,
        assetId,
        receiverAddress
      )
      retTxns[retTxns.length - 1].unsignedTxn.note = enc.encode(
        `You have received ${formattedAmount.balance} ` +
          `from ${senderAddr}! Please go to ${shareLink} to redeem your assets.`
      )
    }

    return retTxns
  },

  convertToMyAlgoTxn: function (txn) {
    console.debug('in convertToMyAlgoTxn', { txn })
    if (txn.lsig) {
      return txn
    }
    // params from getParams
    //fee: 0
    //firstRound: 20102814
    //flatFee: false
    //genesisHash: "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI="
    //genesisID: "testnet-v1.0"
    //lastRound: 20103814

    txn.needsUserSig = true
    const note = txn.unsignedTxn.note
    txn.unsignedTxn = JSON.parse(txn.unsignedTxn.toString())

    delete txn.unsignedTxn.appArgs
    delete txn.unsignedTxn.lease
    delete txn.unsignedTxn.tag
    delete txn.unsignedTxn.name

    txn.unsignedTxn.note = note
    const unsignedTxn = txn.unsignedTxn
    console.debug({ unsignedTxn })

    return txn
  },

  signAndSendLsigTxns: async function (algodClient, outerTxns) {
    const { algodex, algodexApi } = this.getAlgodex()

    try {
      for (let i = 0; i < outerTxns.length; i++) {
        let signedLsig = await algosdk.signLogicSigTransactionObject(
          outerTxns[i].unsignedTxn,
          outerTxns[i].lsig
        )
        outerTxns[i].signedTxn = signedLsig.blob
      }

      let signed = []

      for (let i = 0; i < outerTxns.length; i++) {
        signed.push(outerTxns[i].signedTxn)
      }
      console.debug('printing transaction debug')
      algodexApi.printTransactionDebug(signed)

      const groupTxn = await algodClient.sendRawTransaction(signed).do()
      return algodex.waitForConfirmation(groupTxn.txId)
    } catch (error) {
      return error
    }
  },

  searchAlgoAssets: async function (keywords) {
    const url =
      this.getEnvironment() === 'mainnet'
        ? 'https://indexer.algoexplorerapi.io/rl/v1/search'
        : 'https://indexer.testnet.algoexplorerapi.io/rl/v1/search'
    try {
      const response = await axios.get(url, {
        params: { keywords },
      })
      return response
    } catch (error) {
      return error
    }
  },

  getAlgoNamesOrAddress: async function (address, type) {
    try {
      const options = {
        socials: false,
        metadata: false,
        limit: 1,
      }
      const {
        purestakeIndexerServer,
        purestakeIndexerToken,
        purestakeClientServer,
        purestakeIndexerPort,
      } = this.getAlgodex()
      const client = new algosdk.Algodv2(
        {
          'X-API-Key': purestakeIndexerToken,
          'X-Indexer-API-Token': purestakeIndexerToken,
        },
        purestakeClientServer,
        ''
      )
      const indexer = new algosdk.Indexer(
        {
          'X-API-Key': purestakeIndexerToken,
          'X-Indexer-API-Token': purestakeIndexerToken,
        },
        purestakeIndexerServer,
        purestakeIndexerPort,
      )
      const sdk = new ANS(client, indexer)
      if (type == 'getNames') {
        const names = await sdk.address(address).getNames(options)
        return names
      } else {
        let nameInfo = await sdk.name(address).getOwner()
        return nameInfo
      }
    } catch (error) {
      return error
    }
  },
}

module.exports = Helper
