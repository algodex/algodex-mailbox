const generateTxns = require('../lib/generate_transaction_types.js')
const testHelper = require('@algodex/algodex-sdk/test_helper.js')
const transactionGenerator = require('@algodex/algodex-sdk/generate_transaction_types.js')
const helper = require('../lib/helper.js')
const algosdk = require('algosdk')

const JEST_MINUTE_TIMEOUT = 60 * 1000
const config = {
  senderAccount: testHelper.getRandomAccount(),
  receiverAccount: testHelper.getRandomAccount(),
  receiverAccount2: testHelper.getRandomAccount(),
  openAccount: testHelper.getOpenAccount(),
  maliciousAccount: testHelper.getRandomAccount(),
  client: testHelper.getLocalClient(),
  assetId: 66711302,
}


console.debug('sender account: ' + config.senderAccount.addr)
console.debug('receiver account: ' + config.receiverAccount.addr)
console.debug('receiver account2: ' + config.receiverAccount2.addr)
console.debug('open account: ' + config.openAccount.addr)
console.debug('malicious account: ' + config.maliciousAccount.addr)

const negativeFundEscrowTests = [
  {txnNum: 0, field: 'from', txnKeyForVal: 'from', txnNumForVal: 1}, //set to from escrow
  {txnNum: 0, field: 'amount', val: 100000},
  {txnNum: 0, field: 'to', val: algosdk.decodeAddress(config.maliciousAccount.addr) },
  {txnNum: 0, field: 'reKeyTo', val: algosdk.decodeAddress(config.maliciousAccount.addr) },
  {txnNum: 0, field: 'closeRemainderTo', val: algosdk.decodeAddress(config.maliciousAccount.addr)},
  {txnNum: 0, field: 'type', val: 'axfer', field2: 'assetIndex', val2: config.assetId},
  {txnNum: 1, field: 'amount', val: 100000},
  {txnNum: 1, field: 'closeRemainderTo', val: algosdk.decodeAddress(config.maliciousAccount.addr)},
  {txnNum: 1, field: 'from', val: algosdk.decodeAddress(config.senderAccount.addr)},
  {txnNum: 1, field: 'to', val: algosdk.decodeAddress(config.senderAccount.addr)},
  {txnNum: 1, field: 'type', val: 'pay'},
  {txnNum: 1, field: 'reKeyTo', val: algosdk.decodeAddress(config.maliciousAccount.addr) },
  {txnNum: 2, field: 'amount', val: 0},
  {txnNum: 2, field: 'closeRemainderTo', val: algosdk.decodeAddress(config.maliciousAccount.addr)},
  {txnNum: 2, field: 'from', txnKeyForVal: 'from', txnNumForVal: 1},
  {txnNum: 2, field: 'to', val: algosdk.decodeAddress(config.senderAccount.addr)},
  {txnNum: 2, field: 'type', val: 'pay'},
  {txnNum: 2, field: 'assetIndex', val: 12400859},
  {txnNum: 2, field: 'reKeyTo', val: algosdk.decodeAddress(config.maliciousAccount.addr) },
  {txnNum: 3, field: 'from', val: algosdk.decodeAddress(config.maliciousAccount.addr) },
  {txnNum: 3, field: 'amount', val: 100000},
  {txnNum: 3, field: 'to', val: algosdk.decodeAddress(config.maliciousAccount.addr) },
  {txnNum: 3, field: 'reKeyTo', val: algosdk.decodeAddress(config.maliciousAccount.addr) },
  {txnNum: 3, field: 'closeRemainderTo', val: algosdk.decodeAddress(config.maliciousAccount.addr)},
  {txnNum: 3, field: 'type', val: 'axfer', field2: 'assetIndex', val2: config.assetId},
  {txnNum: 4, negTxn: {
    unsignedTxnPromise:
            transactionGenerator.getAssetSendTxn(
              config.client,
              config.senderAccount.addr,
              config.maliciousAccount.addr,
              1000,
              config.assetId,
              false
            ),
    senderAcct: config.senderAccount
  }
  },
]

const negativeAddMoreFundsTests = [
  {txnNum: 0, field: 'amount', val: 0},
  {txnNum: 0, field: 'closeRemainderTo', val: algosdk.decodeAddress(config.maliciousAccount.addr)},
  {txnNum: 0, field: 'from', txnKeyForVal: 'from', txnNumForVal: 1},
  {txnNum: 0, field: 'to', val: algosdk.decodeAddress(config.senderAccount.addr)},
  {txnNum: 0, field: 'type', val: 'pay'},
  {txnNum: 0, field: 'assetIndex', val: 12400859},
  {txnNum: 0, field: 'reKeyTo', val: algosdk.decodeAddress(config.maliciousAccount.addr) },
  {txnNum: 1, field: 'from', val: algosdk.decodeAddress(config.maliciousAccount.addr) },
  {txnNum: 1, field: 'amount', val: 100000},
  {txnNum: 1, field: 'to', val: algosdk.decodeAddress(config.maliciousAccount.addr) },
  {txnNum: 1, field: 'reKeyTo', val: algosdk.decodeAddress(config.maliciousAccount.addr) },
  {txnNum: 1, field: 'closeRemainderTo', val: algosdk.decodeAddress(config.maliciousAccount.addr)},
  {txnNum: 1, field: 'type', val: 'axfer', field2: 'assetIndex', val2: config.assetId},
  {txnNum: 2, negTxn: {
    unsignedTxnPromise:
            transactionGenerator.getAssetSendTxn(
              config.client,
              config.senderAccount.addr,
              config.maliciousAccount.addr,
              1000,
              config.assetId,
              false
            ),
    senderAcct: config.senderAccount
  }
  },
]

const negativeWithdrawTests = [
  {txnNum: 0, field: 'from', val: algosdk.decodeAddress(config.receiverAccount.addr)},
  {txnNum: 0, field: 'to', val: algosdk.decodeAddress(config.maliciousAccount.addr)},
  {txnNum: 0, field: 'amount', val: 1000},
  {txnNum: 0, field: 'closeRemainderTo', val: algosdk.decodeAddress(config.maliciousAccount.addr)},
  {txnNum: 0, field: 'type', val: 'pay'},
  {txnNum: 0, field: 'assetIndex', val: 12400859},
  {txnNum: 0, field: 'reKeyTo', val: algosdk.decodeAddress(config.maliciousAccount.addr) },
  {txnNum: 1, field: 'from', val: algosdk.decodeAddress(config.receiverAccount.addr)},
  {txnNum: 1, field: 'to', val: algosdk.decodeAddress(config.maliciousAccount.addr)},
  {txnNum: 1, field: 'amount', val: 1000},
  {txnNum: 1, field: 'closeRemainderTo', val: algosdk.decodeAddress(config.maliciousAccount.addr)},
  {txnNum: 1, field: 'type', val: 'axfer'},
  {txnNum: 1, field: 'reKeyTo', val: algosdk.decodeAddress(config.maliciousAccount.addr) },
  {txnNum: 2, negTxn: {
    unsignedTxnPromise:
            transactionGenerator.getPayTxn(
              config.client,
              config.senderAccount.addr,
              config.maliciousAccount.addr,
              1000,
              false
            ),
    senderAcct: config.senderAccount
  }
  }

]

const negativeReturnToSenderTests = [
  {txnNum: 0, field: 'from', val: algosdk.decodeAddress(config.receiverAccount2.addr)},
  {txnNum: 0, field: 'to', val: algosdk.decodeAddress(config.maliciousAccount.addr)},
  {txnNum: 0, field: 'amount', val: 1000},
  {txnNum: 0, field: 'closeRemainderTo', val: algosdk.decodeAddress(config.maliciousAccount.addr)},
  {txnNum: 0, field: 'type', val: 'pay'},
  {txnNum: 0, field: 'assetIndex', val: 12400859},
  {txnNum: 0, field: 'reKeyTo', val: algosdk.decodeAddress(config.maliciousAccount.addr) },
  {txnNum: 1, field: 'from', val: algosdk.decodeAddress(config.receiverAccount2.addr)},
  {txnNum: 1, field: 'to', val: algosdk.decodeAddress(config.maliciousAccount.addr)},
  {txnNum: 1, field: 'amount', val: 1000},
  {txnNum: 1, field: 'closeRemainderTo', val: algosdk.decodeAddress(config.maliciousAccount.addr)},
  {txnNum: 1, field: 'type', val: 'axfer'},
  {txnNum: 1, field: 'reKeyTo', val: algosdk.decodeAddress(config.maliciousAccount.addr) },
  {txnNum: 2, field: 'from', val: algosdk.decodeAddress(config.maliciousAccount.addr)},
  {txnNum: 2, field: 'to', val: algosdk.decodeAddress(config.maliciousAccount.addr)},
  {txnNum: 2, field: 'amount', val: 1000},
  {txnNum: 2, field: 'closeRemainderTo', val: algosdk.decodeAddress(config.maliciousAccount.addr)},
  {txnNum: 2, field: 'type', val: 'axfer'},
  {txnNum: 2, field: 'reKeyTo', val: algosdk.decodeAddress(config.maliciousAccount.addr) },
  {txnNum: 3, negTxn: {
    unsignedTxnPromise:
            transactionGenerator.getPayTxn(
              config.client,
              config.senderAccount.addr,
              config.maliciousAccount.addr,
              1000,
              false
            ),
    senderAcct: config.senderAccount
  }
  }
]

describe('Test Mailbox Funding And Withdrawal', () => {

  test('Setup', async () => {
    const {senderAccount, receiverAccount, receiverAccount2,
      openAccount, maliciousAccount, client, assetId} = config
    await testHelper.transferFunds(client, openAccount, receiverAccount, 1000000)
    await testHelper.transferFunds(client, openAccount, receiverAccount2, 1000000)
    await testHelper.transferFunds(client, openAccount, senderAccount, 1000000)
    await testHelper.transferFunds(client, openAccount, maliciousAccount, 1000000)

    await testHelper.transferASA(client, senderAccount, senderAccount, 0, assetId)
    await testHelper.transferASA(client, receiverAccount, receiverAccount, 0, assetId)
    await testHelper.transferASA(client, receiverAccount, receiverAccount2, 0, assetId)
    await testHelper.transferASA(client, openAccount, senderAccount, 1000000, assetId)
  }, JEST_MINUTE_TIMEOUT)

  negativeFundEscrowTests.map( (negTestTxnConfig) => {
    const {
      senderAccount,
      receiverAccount,
      //openAccount,
      //maliciousAccount,
      client,
      assetId,
    } = config

    // eslint-disable-next-line max-len
    const testName = `Negative fund escrow test: txnNum: ${negTestTxnConfig.txnNum} field: ${negTestTxnConfig.field} val: ${negTestTxnConfig.val}`
    test (testName, async () => {
      if (negTestTxnConfig.negTxn) {
        negTestTxnConfig.negTxn.unsignedTxn = await negTestTxnConfig.negTxn.unsignedTxnPromise
      }
      const outerTxns = await generateTxns.getFundEscrowTxns(
        client,
        assetId,
        100000,
        senderAccount,
        receiverAccount.addr
      )
      expect(outerTxns.length).toBe(4)

      const result = await helper.runNegativeTest(
        config,
        config.client,
        outerTxns,
        negTestTxnConfig
      )
      expect (result).toBeTruthy()
    }, JEST_MINUTE_TIMEOUT)
  })

  test('Fund escrow', async () => {
    const {
      senderAccount,
      receiverAccount,
      receiverAccount2,
      //openAccount,
      //maliciousAccount,
      client,
      assetId
    } = config
    console.debug('destructuring')
    console.debug(client)

    let txns = await generateTxns.getFundEscrowTxns(
      client,
      assetId,
      100000,
      senderAccount,
      receiverAccount.addr
    )
    expect(txns.length).toBe(4)

    let signedTxns = await testHelper.groupAndSignTransactions(txns)

    await testHelper.sendAndCheckConfirmed(client, signedTxns)

    txns = await generateTxns.getFundEscrowTxns(
      client,
      assetId,
      100000,
      senderAccount,
      receiverAccount2.addr
    )

    signedTxns = await testHelper.groupAndSignTransactions(txns)

    await testHelper.sendAndCheckConfirmed(client, signedTxns)
  }, JEST_MINUTE_TIMEOUT)

  negativeAddMoreFundsTests.map( (negTestTxnConfig) => {
    const {
      senderAccount,
      receiverAccount,
      //openAccount,
      //maliciousAccount,
      client,
      assetId,
    } = config

    // eslint-disable-next-line max-len
    const testName = `Negative fund escrow test: txnNum: ${negTestTxnConfig.txnNum} field: ${negTestTxnConfig.field} val: ${negTestTxnConfig.val}`
    test (testName, async () => {
      if (negTestTxnConfig.negTxn) {
        negTestTxnConfig.negTxn.unsignedTxn = await negTestTxnConfig.negTxn.unsignedTxnPromise
      }
      const outerTxns = await generateTxns.getFundEscrowTxns(
        client,
        assetId,
        100000,
        senderAccount,
        receiverAccount.addr
      )
      expect(outerTxns.length).toBe(2) // Since we are adding more, there are only 2 txns

      const result = await helper.runNegativeTest(
        config,
        config.client,
        outerTxns,
        negTestTxnConfig
      )
      expect (result).toBeTruthy()
    }, JEST_MINUTE_TIMEOUT)
  })

  test('Add more funds to escrow', async () => {
    const {
      senderAccount,
      receiverAccount,
      receiverAccount2,
      //openAccount,
      //maliciousAccount,
      client,
      assetId
    } = config
    console.debug('destructuring')
    console.debug(client)

    let txns = await generateTxns.getFundEscrowTxns(
      client,
      assetId,
      100000,
      senderAccount,
      receiverAccount.addr
    )
    expect(txns.length).toBe(2) // Since we are adding more, there are only 2 txns

    let signedTxns = await testHelper.groupAndSignTransactions(txns)

    await testHelper.sendAndCheckConfirmed(client, signedTxns)

    txns = await generateTxns.getFundEscrowTxns(
      client,
      assetId,
      100000,
      senderAccount,
      receiverAccount2.addr
    )

    signedTxns = await testHelper.groupAndSignTransactions(txns)

    await testHelper.sendAndCheckConfirmed(client, signedTxns)
  }, JEST_MINUTE_TIMEOUT)

  negativeWithdrawTests.map( (negTestTxnConfig) => {
    const {
      senderAccount,
      receiverAccount,
      //openAccount,
      //maliciousAccount,
      client,
      assetId
    } = config

    // eslint-disable-next-line max-len
    const testName = `Negative withdraw test: txnNum: ${negTestTxnConfig.txnNum} field: ${negTestTxnConfig.field} val: ${negTestTxnConfig.val}`
    test (testName, async () => {
      if (negTestTxnConfig.negTxn) {
        negTestTxnConfig.negTxn.unsignedTxn = await negTestTxnConfig.negTxn.unsignedTxnPromise
      }
      const outerTxns = await generateTxns.getRedeemEscrowTxns(client, assetId, 
        receiverAccount.addr, senderAccount.addr)
      //const txn = outerTxns[1].unsignedTxn;

      const result = await helper.runNegativeTest(
        config,
        config.client,
        outerTxns,
        negTestTxnConfig
      )
      expect (result).toBeTruthy()
    }, JEST_MINUTE_TIMEOUT)
  })

  test('Withdraw from escrow', async () => {
    const {
      senderAccount,
      receiverAccount,
      //openAccount,
      //maliciousAccount,
      client,
      assetId
    } = config

    const txns = await generateTxns.getRedeemEscrowTxns(client, assetId, 
      receiverAccount.addr, senderAccount.addr)
    // const firstTxn = txns[0].unsignedTxn
    const signedTxns = await testHelper.groupAndSignTransactions(txns)

    await testHelper.sendAndCheckConfirmed(client, signedTxns)
  }, JEST_MINUTE_TIMEOUT)

  negativeReturnToSenderTests.map( (negTestTxnConfig) => {
    const {
      senderAccount,
      receiverAccount2,
      //openAccount,
      //maliciousAccount,
      client,
      assetId
    } = config

    // eslint-disable-next-line max-len
    const testName = `Negative return to sender test: txnNum: ${negTestTxnConfig.txnNum} field: ${negTestTxnConfig.field} val: ${negTestTxnConfig.val}`
    test (testName, async () => {
      if (negTestTxnConfig.negTxn) {
        negTestTxnConfig.negTxn.unsignedTxn = await negTestTxnConfig.negTxn.unsignedTxnPromise
      }
      const outerTxns = await generateTxns.getReturnToSenderTxns(client, assetId, 
        receiverAccount2.addr, senderAccount)
      //const txn = outerTxns[1].unsignedTxn;

      const result = await helper.runNegativeTest(
        config,
        config.client,
        outerTxns,
        negTestTxnConfig
      )
      expect (result).toBeTruthy()
    }, JEST_MINUTE_TIMEOUT)
  })

  test('Return To Sender', async () => {
    const {
      senderAccount,
      receiverAccount2,
      //openAccount,
      //maliciousAccount,
      client,
      assetId
    } = config


    const txns = await generateTxns.getReturnToSenderTxns(client, assetId, 
      receiverAccount2.addr, senderAccount)
    // const firstTxn = txns[0].unsignedTxn
    const signedTxns = await testHelper.groupAndSignTransactions(txns)

    await testHelper.sendAndCheckConfirmed(client, signedTxns)
  }, JEST_MINUTE_TIMEOUT)


  test('Close Accounts', async () => {
    const {
      //lsigAccount,
      senderAccount,
      receiverAccount,
      receiverAccount2,
      openAccount,
      maliciousAccount,
      client,
      //assetId
    } = config

    await testHelper.closeAccount(client, receiverAccount, openAccount)
    await testHelper.closeAccount(client, receiverAccount2, openAccount)
    await testHelper.closeAccount(client, maliciousAccount, openAccount)
    await testHelper.closeAccount(client, senderAccount, openAccount)

  }, JEST_MINUTE_TIMEOUT)

})
