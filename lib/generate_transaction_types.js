/////////////////////////////
// Alexander Trefonas      //
// 7/12/2021                //
// Copyright Algodev Inc   //
// All Rights Reserved.    //
/////////////////////////////

const algosdk = require('algosdk');
const helper = require('../lib/helper.js');

const GenerateTransactions = {

    getFundEscrowTxns : async function (algodClient, assetId, assetAmount, toAddress) {
        const optedIn = true;
        return optedIn;

    }
   /* getPlaceAlgoEscrowOrderTxns : async function (algodClient, 
        assetId, appId, isExistingEscrow = false,
                                        skipASAOptIn = false) {
        const makerAddr = makerAccount.addr;
        const min = 0;
        const numAndDenom = algodex.getNumeratorAndDenominatorFromPrice(price);
        const n = numAndDenom.n;
        const d = numAndDenom.d;
        console.log("getPlaceAlgoEscrowOrderTxns makerWalletAddr, n, d, min, assetId",
            makerAddr, n, d, min, assetId);
        let program = algodex.buildDelegateTemplateFromArgs(min, assetId, n, d, makerAddr, false, constants.ESCROW_CONTRACT_VERSION);
        let lsig = await algodex.getLsigFromProgramSource(algosdk, algodClient, program, constants.DEBUG_SMART_CONTRACT_SOURCE);
        let generatedOrderEntry = algodex.generateOrder(makerAddr, n, d, min, assetId);
        console.log("sending trans to: " + lsig.address());

        let txn = await this.getPayTxn(algodClient, makerAddr, lsig.address(), algoOrderSize, false);
        let outerTxns = [];

        outerTxns.push({
            unsignedTxn: txn,
            senderAcct: makerAccount
        });

        console.log("here3 calling app from logic sig to open order");
        let appArgs = [];
        var enc = new TextEncoder();
        appArgs.push(enc.encode("open"));
        appArgs.push(enc.encode(generatedOrderEntry.slice(59)));
        appArgs.push(new Uint8Array([constants.ESCROW_CONTRACT_VERSION]));

        //appArgs.push(algosdk.decodeAddress(makerAddr).publicKey);

        //console.log("owners bit addr: " + ownersBitAddr);
        console.log("herezzz_888");
        console.log(appArgs.length);
        let logSigTrans = null;

        if (!isExistingEscrow) {
            logSigTrans = await dexInternal.createTransactionFromLogicSig(algodClient, lsig, appId, appArgs, "appOptIn");
            outerTxns.push({
                unsignedTxn: logSigTrans,
                lsig: lsig
            });
        }

        console.log("skipASAOptIn: " + skipASAOptIn);
        
        if (!skipASAOptIn) {
            // asset opt-in transfer
            let assetOptInTxn = await this.getAssetSendTxn(algodClient, makerAddr, makerAddr, 0, assetId, false);

            outerTxns.push({
                unsignedTxn: assetOptInTxn,
                senderAcct: makerAccount
            });
        }
        return outerTxns;
    },
*/
};

module.exports = GenerateTransactions;
