/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

const axios = require('axios')
const helper = require('./helper.js')

const TransactionHistory = {
  getCSVRows: async function (assetId, senderAddress, sendType) {
    try {
      const { purestakeIndexerToken } = helper.getAlgodex()
      // Use Purestake since Algoexplorer disabled this type of lookup
      const indexerToken = purestakeIndexerToken
      const notePrefix = `{"AlgodexMailbox-${senderAddress}-${assetId}-${sendType}`
      const encodedNote = Buffer.from(notePrefix).toString('base64')
      const decimals = await helper.getAssetDecimals(assetId)
      const transactions = []
      let next = ''
      let loopCount = 0
      do {
        const url =
          `${indexerServer}:${purestakeIndexerPort}/v2/accounts/${senderAddress}` +
          `/transactions?next=${next}&note-prefix=${encodedNote}&asset-id=${assetId}`
        const response = await axios.get(url, {
          headers: { 
            'Content-Type': 'application/json',
            'X-API-Key': indexerToken,
            'X-Indexer-API-Token': indexerToken,
          },
        })
        next = response?.data['next-token']
        if (response?.data?.transactions) {
          transactions.push.apply(transactions, response.data.transactions)
        }
        loopCount++
        if (!next) {
          break
        }
      } while (loopCount <= 40) // arbitrary number that feels right
      return transactions.reduce((previousVal, entry) => {
        const note = entry.note
        const sender = entry.sender
        const txId = entry.id

        const escrow = entry['asset-transfer-transaction'].receiver
        const amount = entry['asset-transfer-transaction'].amount
        const formattedAmount =
          helper.getFormattedAssetBalanceFromAmountAndDecimals(
            amount,
            assetId,
            decimals
          )
        const buff = Buffer.from(note, 'base64')
        const decodedNote = buff.toString('utf8')
        const noteObj = JSON.parse(decodedNote)
        const firstKey = Object.keys(noteObj)[0]
        const receiver = noteObj[firstKey].toAddress
        //const sendType = noteObj[firstKey].sendType
        const unixTime = parseInt(entry['round-time'])
        const formattedTime = new Date(unixTime * 1000)
        return (
          previousVal +
          // eslint-disable-next-line
          `${formattedTime},${sender},${receiver},${formattedAmount},${escrow},${sendType},${assetId},${txId}` +
          '\n'
        )
      }, '')
    } catch (error) {
      return {
        error: true,
        message: error,
      }
    }
  },
  getTransactionHistory: async function (assetId, senderAddress) {
    const sendTypes = ['initialFundEscrow', 'addToEscrow', 'sendDirect']
    const csvHeader =
      'Time,FromAddress,ToAddress,Amount,Escrow,SendType,AssetId,TransactionId\n'
    let csvRows = ''
    for (let i = 0; i < sendTypes.length; i++) {
      const res = await this.getCSVRows(assetId, senderAddress, sendTypes[i])
      if (res.error == true) {
        return res
      } else {
        csvRows += res
      }
    }
    let csvRowsArr = csvRows.split('\n')
    csvRowsArr.sort((row1, row2) => {
      const getDateFromRow = (row) => {
        return new Date(row.split(',')[0])
      }
      const date1 = getDateFromRow(row1)
      const date2 = getDateFromRow(row2)
      if (date1 < date2) {
        return 1
      } else if (date1 > date2) {
        return -1
      }
      return 0
    })
    return csvRowsArr.reduce(
      (previous, row) => previous + row + '\n',
      csvHeader
    )
  },
}

module.exports = TransactionHistory
