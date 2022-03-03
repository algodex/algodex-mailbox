const EscrowTemplate = require('../lib/escrow_template.js');
const algodex = require('@algodex/algodex-sdk');
const testHelper = require('@algodex/algodex-sdk/test_helper.js');
const algodexApi = require('@algodex/algodex-sdk/algodex_api.js');

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

        if (field === 'type' && val === 'axfer') {
            outerTxns[txnNum].unsignedTxn['assetIndex'] = config.assetId;
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

    formatTransactionsWithMetadata : function (txns, senderAddr, txnType,
        sendEntry, assetId
            ){
        let acceptedTxnTypes = ['fund', 'withdraw']

        function OrderTypeException(message) {
            this.message = message;
            this.name = 'OrderTypeException';
          }
          OrderTypeException.prototype = Error.prototype;
          if(!acceptedTxnTypes.includes(txnType)) {throw new OrderTypeException(`Invalid order type, please input one of the following: ${acceptedTxnTypes}`)}
        let enc = new TextEncoder()
        let groupMetadata = { };
        groupMetadata[`${senderAddr}-${assetId}-${txnType}`] = sendEntry
        return txns.map(txn => { 
            txn.unsignedTxn.note= enc.encode(JSON.stringify(groupMetadata))
            return txn
        })
    },

    convertToMyAlgoTxn : function(txn) {
        console.log('in convertToMyAlgoTxn', {txn});
        if (txn.lsig) {
            return txn;
        }
        // params from getParams
        //fee: 0
        //firstRound: 20102814
        //flatFee: false
        //genesisHash: "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI="
        //genesisID: "testnet-v1.0"
        //lastRound: 20103814

        txn.needsUserSig = true;
        const note = txn.unsignedTxn.note;
        txn.unsignedTxn = JSON.parse(txn.unsignedTxn.toString());

        delete txn.unsignedTxn.appArgs;
        delete txn.unsignedTxn.lease;
        delete txn.unsignedTxn.tag;
        delete txn.unsignedTxn.name;

        txn.unsignedTxn.note = note;
        const unsignedTxn = txn.unsignedTxn;
        console.log({unsignedTxn})

        return txn;
    },

    signAndSendWithMyAlgo : async function (algodClient, outerTxns) {
        let enc = new TextDecoder()

        console.log({params});
        const convertedTxns = outerTxns.map(txn => {
            if (txn.lsig) {
                return txn;
            }

            txn.needsUserSig = true;
            const note = txn.unsignedTxn.note;
            txn.unsignedTxn = JSON.parse(txn.unsignedTxn.toString());

            delete txn.unsignedTxn.appArgs;
            delete txn.unsignedTxn.lease;
            //console.log({unsignedTxn})

            txn.unsignedTxn.note = note;
            const unsignedTxn = txn.unsignedTxn;
            console.log({unsignedTxn})

            return txn;
        })
        return algodexApi.signAndSendTransactions(algodClient, convertedTxns);
    }
}

module.exports = Helper;