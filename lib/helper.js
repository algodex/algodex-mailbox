const EscrowTemplate = require('../lib/escrow_template.js')
const algodexImport = require('@algodex/algodex-sdk')
const testHelper = require('@algodex/algodex-sdk/test_helper.js')
const algodexApiImport = require('@algodex/algodex-sdk/algodex_api.js')
const algosdk = require('algosdk')
const axios = require('axios').default
const BigN = require('js-big-decimal')
let didInitAlgodex = false

const Helper = {
  envObjs: null,
  getAlgodex : function() {
    if (!didInitAlgodex) {
      const environment = this.getEnvironment()
      const algodexEnvironment = environment === 'mainnet' ? 'production' : 'public_test'
      const algodClient = algodexImport.initAlgodClient(algodexEnvironment)
      algodexImport.initIndexer(algodexEnvironment)
      algodexApiImport.initAlgodClient(algodexEnvironment)
      algodexApiImport.initIndexer(algodexEnvironment)

      const indexerServer = this.getEnvironment() === 'mainnet' ? 
        'https://algoindexer.algoexplorerapi.io' :
        'https://algoindexer.testnet.algoexplorerapi.io'
      const indexerPort = ''
      const indexerToken = ''
      this.envObjs = { algodex: algodexImport, algodexApi: algodexApiImport, 
        algodClient, indexerServer, indexerPort, indexerToken, environment,
        algodexEnvironment }
    }
    didInitAlgodex = true
    return this.envObjs
  },

  buildEscrowFromTemplate : function (assetId, receiverAddress, senderAddress) {
    if (isNaN(assetId) || !receiverAddress || receiverAddress.length === 0 
        || !senderAddress || senderAddress.length === 0) {
      throw 'one or more null arguments in buildDelegateTemplateFromArgs!'
    }
    const escrowTemplate = EscrowTemplate.getTealTemplate()

    let res = escrowTemplate.split('<assetId>').join(assetId)
    res = res.split('<receiverAddr>').join(receiverAddress)
    res = res.split('<senderAddr>').join(senderAddress)
    return res
  },
  getAssetUnitName: async function (assetId) {
    const { indexerServer, indexerPort, indexerToken } = this.getAlgodex()
  
    const response = await axios.get(
      indexerServer + indexerPort + '/v2/assets/' + assetId,
      { headers: { 'X-Algo-API-Token': indexerToken } }
    )
    return response.data.asset.params['unit-name']
  },
  getAssetDecimals: async function (assetId) {
    const { indexerServer, indexerPort, indexerToken } = this.getAlgodex()

    const response = await axios.get(
      indexerServer + indexerPort + '/v2/assets/' + assetId,
      { headers: { 'X-Algo-API-Token': indexerToken } }
    )
    return response.data.asset.params.decimals
  },
  checkOptIn: async function (addr) {
    const { algodex } = this.getAlgodex()
    let accountInfo = await algodex.getAccountInfo(addr)
    let alreadyOptedIn = false
    if (
      accountInfo != null &&
      accountInfo['assets'] != null &&
      accountInfo['assets'].length > 0 &&
      accountInfo['assets'][0] != null
    ) {
      alreadyOptedIn = true
    }

    console.log('optin status: ' + alreadyOptedIn)
    return alreadyOptedIn
  },

  getAssetBalance: async function (addr, assetId) {
    const { algodex } = this.getAlgodex()

    let accountInfo = await algodex.getAccountInfo(addr)
    let walletAssetAmount = 0
    for (let i = 0; i < accountInfo['assets'].length; i++) {
      let asset = accountInfo['assets'][i]
      if (asset['asset-id'] === assetId) {
        walletAssetAmount = asset['amount']
        break
        //console.debug("execAccountInfo: " + execAccountInfo);
      }
    }
    return walletAssetAmount
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

  getEnvironment : function() {
    if (process.env.NEXT_PUBLIC_ALGODEX_ENVIRONMENT == 'mainnet') {
      return 'mainnet'
    }
    return 'testnet'
  },

  getFormattedAssetBalance : async function(addr, assetId, showName = false) {
    try {
      //TODO: fetch in parallel
      let assetBalance = await this.getAssetBalance(addr, assetId)
      let assetDecimals = await this.getAssetDecimals(assetId)
      const formattedBalance = this.getFormattedAssetBalanceFromAmountAndDecimals(
        assetBalance,
        assetId,
        assetDecimals
      )
      const unitName = showName ? ' ' + await this.getAssetUnitName(assetId) : ''
      return {
        error: false,
        balance:formattedBalance + unitName,
      } 
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
    console.log('STARTING runNegativeTest')
    console.log({ negTestTxnConfig })

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
        console.log({ configKeyForVal, config })
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
    console.log({ txn })

    let signedTxns = testHelper.groupAndSignTransactions(outerTxns)

    try {
      await testHelper.sendAndCheckConfirmed(client, signedTxns)
    } catch (e) {
      // An exception is expected. Return true for success
      return testHelper.checkFailureType(e)
    }

    return false
  },

  formatTransactionsWithMetadata: function (
    txns,
    senderAddr,
    txnType,
    sendEntry,
    assetId
  ) {
    let acceptedTxnTypes = ['fund', 'withdraw']

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
    groupMetadata[`${senderAddr}-${assetId}-${txnType}`] = sendEntry
    return txns.map((txn) => {
      txn.unsignedTxn.note = enc.encode(JSON.stringify(groupMetadata))
      return txn
    })
  },

  convertToMyAlgoTxn: function (txn) {
    console.log('in convertToMyAlgoTxn', { txn })
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
    console.log({ unsignedTxn })

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
}

module.exports = Helper
