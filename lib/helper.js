const EscrowTemplate = require('../lib/escrow_template.js');
const algodex = require('@algodex/algodex-sdk');
const Helper = {

    buildEscrowFromTemplate : function (assetId, receiverAddress) {
        if (isNaN(assetId) || !receiverAddress || receiverAddress.length == 0 ) {
            throw "one or more null arguments in buildDelegateTemplateFromArgs!";
        }
        const escrowTemplate = EscrowTemplate.getTealTemplate();

        let res = escrowTemplate.split("<assetid>").join(assetId);
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
    }

}

module.exports = Helper;