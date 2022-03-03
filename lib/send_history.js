const axios = require('axios');
const helper = require('../lib/helper.js');

const SendHistory = {
    getSendHistory: async function(assetId, senderAddress) {
        const ALGOD_INDEXER_SERVER = 'https://algoindexer.testnet.algoexplorerapi.io';
        const ALGOD_INDEXER_TOKEN = '';
        const ALGOD_PORT = '';

        const notePrefix = `{"${senderAddress}-${assetId}-fund`;
        const encodedNote = Buffer.from(notePrefix).toString('base64');
        const decimals = await helper.getAssetDecimals(assetId);

        const url = `${ALGOD_INDEXER_SERVER}${ALGOD_PORT}/v2/accounts/${senderAddress}/transactions?note-prefix=${encodedNote}&asset-id=${assetId}`;
        const response = await axios.get(url, {headers: {'X-Algo-API-Token': ALGOD_INDEXER_TOKEN}});
        const csvHeader = 'FromAddress,ToAddress,Amount,Escrow,';
        return csvHeader + response.data.transactions.reduce ( (previousVal, entry) => {
            const note = entry.note;
            const sender = entry.sender;
            const escrow = entry['asset-transfer-transaction'].receiver;
            const amount = entry['asset-transfer-transaction'].amount;
            const formattedAmount = helper.getFormattedAssetBalanceFromAmountAndDecimals(amount, assetId, decimals);
            const buff = Buffer.from(note, "base64");
            const decodedNote = buff.toString("utf8");
            const noteObj = JSON.parse(decodedNote);
            const firstKey = Object.keys(noteObj)[0];
            const receiver = noteObj[firstKey].toAddress;
            return previousVal + `${sender},${receiver},${formattedAmount},${escrow}` + "\n";
        }, '');
    }
};

module.exports = SendHistory;