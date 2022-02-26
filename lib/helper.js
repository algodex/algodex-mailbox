const EscrowTemplate = require('../lib/escrow_template.js');

const Helper = {

    buildEscrowFromTemplate : function (assetId, receiverAddress) {
        if (isNaN(assetId) || !receiverAddress || receiverAddress.length == 0 ) {
            throw "one or more null arguments in buildDelegateTemplateFromArgs!";
        }
        const escrowTemplate = EscrowTemplate.getTealTemplate();

        let res = delegateTemplate.split("<assetid>").join(assetId);
        res = res.split("<receiverAddr>").join(receiverAddress);
        return res;
    },

    checkOptIn : async function(addr) {
        let accountInfo = await this.getAccountInfo(addr);
        let alreadyOptedIn = false;
        if (accountInfo != null && accountInfo['assets'] != null
            && accountInfo['assets'].length > 0 && accountInfo['assets'][0] != null) {
            alreadyOptedIn = true;
        }

        return alreadyOptedIn;
    }

}

module.exports = Helper;