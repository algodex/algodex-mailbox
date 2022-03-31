/* 
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

const axios = require('axios')
const helper = require('./helper.js')

const TransactionHistory = {
  getTransactionHistory: async function (assetId, senderAddress) {
    try {
      const { indexerServer, indexerPort, indexerToken } = helper.getAlgodex()

      const notePrefix = `{"AlgodexMailbox-${senderAddress}-${assetId}-fund`
      const encodedNote = Buffer.from(notePrefix).toString('base64')
      const decimals = await helper.getAssetDecimals(assetId)

      const transactions = []
      let next = ''
      let loopCount = 0
      do {
      // eslint-disable-next-line max-len
        const url = `${indexerServer}${indexerPort}/v2/accounts/${senderAddress}/transactions?next=${next}&note-prefix=${encodedNote}&asset-id=${assetId}`

        const response = await axios.get(url, {headers: {'X-Algo-API-Token': indexerToken}})
        next = response?.data['next-token']
        if (response?.data?.transactions) {
          transactions.push.apply(transactions, response.data.transactions)
        }
        loopCount++
        if (!next) {
          break
        }
      } while(loopCount <= 40) // arbitrary number that feels right
      const csvHeader = 'Time,FromAddress,ToAddress,Amount,Escrow,SendType,AssetId\n'
      return csvHeader + transactions.reduce ( (previousVal, entry) => {
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
        const sendType = noteObj[firstKey].sendType || 'escrow'
        const unixTime = parseInt(entry['round-time'])
        const formattedTime = new Date(unixTime * 1000)
        return previousVal + 
          // eslint-disable-next-line
          `${formattedTime},${sender},${receiver},${formattedAmount},${escrow},${sendType},${assetId}` 
            + '\n'
      }, '')
    } catch (error) {
      return {
        error:true,
        message:error
      }
    }
  }
}

module.exports = TransactionHistory