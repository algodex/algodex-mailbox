const generateTxns = require('../lib/generate_transaction_types.js');
const testHelper = require('@algodex/algodex-sdk/test_helper.js');
const algosdk = require('algosdk');

const JEST_MINUTE_TIMEOUT = 60 * 1000;
const config = {
  senderAccount: testHelper.getRandomAccount(),
  receiverAccount: testHelper.getRandomAccount(),
  openAccount: testHelper.getOpenAccount(),
  maliciousAccount: testHelper.getRandomAccount(),
  client: testHelper.getLocalClient(),
  assetId: 66711302,
};

describe('Test Mailbox Funding And Withdrawal', () => {

  test('Setup', async () => {
    const {senderAccount, receiverAccount, openAccount, maliciousAccount, client, assetId} = config;
    await testHelper.transferFunds(client, openAccount, receiverAccount, 1000000);
    await testHelper.transferFunds(client, openAccount, senderAccount, 1000000);
    await testHelper.transferFunds(client, openAccount, maliciousAccount, 1000000);
    
    await testHelper.transferASA(client, senderAccount, senderAccount, 0, assetId);
    await testHelper.transferASA(client, openAccount, senderAccount, 1000000, assetId);
  }, JEST_MINUTE_TIMEOUT);

  test('Fund escrow', async () => {
    const {senderAccount, receiverAccount, openAccount, maliciousAccount, client, assetId} = config;
    console.log('destructuring');
    console.log(client);

    const txns = await generateTxns.getFundEscrowTxns(client, assetId, 100000, senderAccount, receiverAccount.addr);
    const firstTxn = txns[0].unsignedTxn;
    console.log({firstTxn});
    const signedTxns = await testHelper.groupAndSignTransactions(txns);

    console.log('printing txns');
    console.log({signedTxns});
    await testHelper.sendAndCheckConfirmed(client, signedTxns);
  }, JEST_MINUTE_TIMEOUT);

  test('Withdraw from escrow', async () => {
    const {senderAccount, receiverAccount, openAccount, maliciousAccount, client, assetId} = config;

    const txns = await generateTxns.getCloseEscrowTxns(client, assetId, receiverAccount.addr);
    const firstTxn = txns[0].unsignedTxn;
    const signedTxns = await testHelper.groupAndSignTransactions(txns);

    await testHelper.sendAndCheckConfirmed(client, signedTxns);
  }, JEST_MINUTE_TIMEOUT);

  test('Close Accounts', async () => {
    const {lsigAccount, senderAccount, receiverAccount, openAccount, maliciousAccount, client, assetId} = config;

    await testHelper.closeAccount(client, receiverAccount, openAccount);
    await testHelper.closeAccount(client, maliciousAccount, openAccount);
    await testHelper.closeAccount(client, senderAccount, openAccount);

  }, JEST_MINUTE_TIMEOUT);

});



