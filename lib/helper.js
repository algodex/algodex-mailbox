const EscrowTemplate = require('../lib/escrow_template.js');
const algodex = require('@algodex/algodex-sdk');
const testHelper = require('@algodex/algodex-sdk/test_helper.js');

const Helper = {

    buildEscrowFromTemplate : function (assetId, receiverAddress) {
        if (isNaN(assetId) || !receiverAddress || receiverAddress.length == 0 ) {
            throw "one or more null arguments in buildDelegateTemplateFromArgs!";
        }
        const escrowTemplate = EscrowTemplate.getTealTemplate();

        let res = escrowTemplate.split("<assetId>").join(assetId);
        res = res.split("<receiverAddr>").join(receiverAddress);
        return res;
    },

    checkOptIn : async function(addr) {
        let accountInfo = await algodex.getAccountInfo(addr);
        let alreadyOptedIn = false;
        if (accountInfo != null && accountInfo['assets'] != null
            && accountInfo['assets'].length > 0 && accountInfo['assets'][0] != null) {
            alreadyOptedIn = true;
        }

        console.log('optin status: ' + alreadyOptedIn);
        return alreadyOptedIn;
    },

    runNegativeTest : async function (config, client, outerTxns, negTestTxnConfig) {
        console.log("STARTING runNegativeTest");
        console.log({negTestTxnConfig});

        const {txnNum, field, val, negTxn, innerNum, configKeyForVal, txnKeyForVal, txnNumForVal} = negTestTxnConfig;
        const txn = outerTxns[txnNum];

        const getVal = () => {
            if (configKeyForVal !== undefined) {
                console.log({configKeyForVal, config});
                return config[configKeyForVal];
            }
            if (txnKeyForVal !== undefined) {
                return outerTxns[txnNumForVal].unsignedTxn[txnKeyForVal];
            }
            return val;
        }

        if (!negTxn) {
            if (innerNum === undefined) {
                outerTxns[txnNum].unsignedTxn[field] = getVal();
                if (txnKeyForVal === 'from' && field === 'from') {
                    delete outerTxns[txnNum].lsig;
                    delete outerTxns[txnNum].senderAcct;

                    if (outerTxns[txnNumForVal].lsig !== undefined) {
                        outerTxns[txnNum].lsig = outerTxns[txnNumForVal].lsig;
                    }
                    if (outerTxns[txnNumForVal].senderAcct !== undefined) {
                        outerTxns[txnNum].senderAcct = outerTxns[txnNumForVal].senderAcct;
                    }
                }
            } else {
                outerTxns[txnNum].unsignedTxn[field][innerNum] = getVal();
            }
        } else {
            outerTxns[txnNum] = negTxn;
        }
        //const t = outerTxns[0];
        console.log({txn});

        let signedTxns = testHelper.groupAndSignTransactions(outerTxns);

        try {
            await testHelper.sendAndCheckConfirmed(client, signedTxns);
        } catch (e) {
            // An exception is expected. Return true for success
            return testHelper.checkFailureType(e);
        }
        
        return false;
    },


}

module.exports = Helper;