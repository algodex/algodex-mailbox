const generateTxns = require('../lib/generate_transaction_types.js');
const testHelper = require('@algodex/algodex-sdk/test_helper.js');

const JEST_MINUTE_TIMEOUT = 60 * 1000;
const config = {
  senderAccount: testHelper.getRandomAccount(),
  receiverAccount: testHelper.getRandomAccount(),
  openAccount: testHelper.getOpenAccount(),
  maliciousAccount: testHelper.getRandomAccount(),
  client: testHelper.getLocalClient(),
  assetId: 66711302,
};

describe('Test Order Matching', () => {

  test('Setup', async () => {
    const {senderAccount, receiverAccount, openAccount, maliciousAccount, client, assetId} = config;
    await testHelper.transferFunds(client, openAccount, receiverAccount, 1000000);
    await testHelper.transferFunds(client, openAccount, senderAccount, 1000000);
    await testHelper.transferFunds(client, openAccount, maliciousAccount, 1000000);
    
    await testHelper.transferASA(client, senderAccount, senderAccount, 0, assetId);
    await testHelper.transferASA(client, openAccount, senderAccount, 1000000, assetId);
  }, JEST_MINUTE_TIMEOUT);

  test('Close Accounts', async () => {
    const {senderAccount, receiverAccount, openAccount, maliciousAccount, client, assetId} = config;

    await testHelper.closeAccount(client, receiverAccount, openAccount);
    await testHelper.closeAccount(client, maliciousAccount, openAccount);
    await testHelper.closeAccount(client, senderAccount, openAccount);
    
    const optedIn = await generateTxns.getFundEscrowTxns(null, null, null, null);
    expect(optedIn).toBe(true);

  }, JEST_MINUTE_TIMEOUT);

});



