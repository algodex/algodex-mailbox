const axios = require('axios')
const helper = require('../lib/helper.js')

const SendHistory = {
  getSendHistory: async function (assetId, senderAddress) {
    try {
      const ALGOD_INDEXER_SERVER =
        'https://algoindexer.testnet.algoexplorerapi.io'
      const ALGOD_INDEXER_TOKEN = ''
      const ALGOD_PORT = ''

      const notePrefix = `{"${senderAddress}-${assetId}-fund`
      const encodedNote = Buffer.from(notePrefix).toString('base64')
      const decimals = await helper.getAssetDecimals(assetId)

      // eslint-disable-next-line max-len
      const url = `${ALGOD_INDEXER_SERVER}${ALGOD_PORT}/v2/accounts/${senderAddress}/transactions?note-prefix=${encodedNote}&asset-id=${assetId}`
      const response = await axios.get(url, {headers: {'X-Algo-API-Token': ALGOD_INDEXER_TOKEN}})
      const csvHeader = 'Time,FromAddress,ToAddress,Amount,Escrow\n'
      return csvHeader + response.data.transactions.reduce ( (previousVal, entry) => {
        const note = entry.note
        const sender = entry.sender
        const escrow = entry['asset-transfer-transaction'].receiver
        const amount = entry['asset-transfer-transaction'].amount
        const formattedAmount = helper.getFormattedAssetBalanceFromAmountAndDecimals(
          amount,
          assetId,
          decimals
        )
        const buff = Buffer.from(note, 'base64')
        const decodedNote = buff.toString('utf8')
        const noteObj = JSON.parse(decodedNote)
        const firstKey = Object.keys(noteObj)[0]
        const receiver = noteObj[firstKey].toAddress
        const unixTime = parseInt(entry['round-time'])
        const formattedTime = new Date(unixTime * 1000)
        return previousVal + 
          `${formattedTime},${sender},${receiver},${formattedAmount},${escrow}` + '\n'
      }, '')
    } catch (error) {
      return {
        error:true,
        message:error
      }
    }
  }
}

module.exports = SendHistory
