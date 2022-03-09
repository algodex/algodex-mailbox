const axios = require('axios')
const ValidationError = require('../ValidationError')
const helper = require('@/lib/helper')
const ajv = require('@/lib/schema')
/**
 *
 * @param asset
 * @param wallet
 * @param config
 * @returns {Promise<string|{error: boolean, message}>}
 */
async function getHistory({asset, wallet, config}) {
  const validateAsset = ajv.getSchema('Asset.Id')
  const validateWallet = ajv.getSchema('Wallet.Address')

  // Massage Variables
  const {id: assetId} = asset
  const {address: senderAddress} = wallet
  const {indexer: {uri, token, port}} = config

  if(!validateAsset(assetId)) throw new ValidationError(validateAsset.errors)
  if(!validateWallet(senderAddress)) throw new ValidationError(validateWallet.errors)

  const ALGOD_INDEXER_SERVER = uri
  const ALGOD_INDEXER_TOKEN = token | ''
  const ALGOD_PORT = port | ''

  const notePrefix = `{"${senderAddress}-${assetId}-fund`
  const encodedNote = Buffer.from(notePrefix).toString('base64')
  const decimals = await helper.getAssetDecimals(assetId)

  const transactions = []
  let next = ''
  let loopCount = 0
  do {
    // eslint-disable-next-line max-len
    const url = `${ALGOD_INDEXER_SERVER}${ALGOD_PORT}/v2/accounts/${senderAddress}/transactions?next=${next}&note-prefix=${encodedNote}&asset-id=${assetId}`

    const response = await axios.get(url, {headers: {'X-Algo-API-Token': ALGOD_INDEXER_TOKEN}})
    next = response?.data['next-token']
    if (response?.data?.transactions) {
      transactions.push.apply(transactions, response.data.transactions)
    }
    loopCount++
    if (!next) {
      break
    }
  } while(loopCount <= 40) // arbitrary number that feels right
  const csvHeader = 'Time,FromAddress,ToAddress,Amount,Escrow\n'
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
    const unixTime = parseInt(entry['round-time'])
    const formattedTime = new Date(unixTime * 1000)
    return previousVal +
          `${formattedTime},${sender},${receiver},${formattedAmount},${escrow}` + '\n'
  }, '')
}

module.exports = getHistory
