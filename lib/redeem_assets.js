// const EscrowTemplate = require('../lib/escrow_template.js')
// const algodex = require('@algodex/algodex-sdk')
// const algodex_api = require('@algodex/algodex-sdk/algodex_api.js')
// const { convertCSVToArray } = require('convert-csv-to-array')
const generateTransactions = require('../lib/generate_transaction_types')
const algosdk = require('algosdk')
const helper = require('../lib/helper.js')

const RedeemAssets = {
  getEscrowBalance: async function(assetId, receiverAddress) {
    // TODO : remove the algod initialization below
    // ALSO TODO: convert from decimal asset values to the integer amounts
    const ALGOD_SERVER='https://testnet.algoexplorerapi.io'
    const ALGOD_TOKEN = '' //{ 'X-API-Key': 'VELyABA1dGqGbAVktbew4oACvp0c0298gMgYtYIb' }
    const ALGOD_PORT=''

    const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)

    assetId = parseInt(assetId)

    const outerTxns = await generateTransactions.getCloseEscrowTxns(algodClient, assetId,
      receiverAddress)

    const publicKey = outerTxns[0].unsignedTxn.from.publicKey
    const encodedAddress = algosdk.encodeAddress(publicKey)
    return await helper.getFormattedAssetBalance(encodedAddress, assetId, true)
  },

  redeem: async function(assetId, receiverAddress) {

    // TODO : remove the algod initialization below
    // ALSO TODO: convert from decimal asset values to the integer amounts
    const ALGOD_SERVER='https://testnet.algoexplorerapi.io'
    const ALGOD_TOKEN = '' //{ 'X-API-Key': 'VELyABA1dGqGbAVktbew4oACvp0c0298gMgYtYIb' }
    const ALGOD_PORT=''

    const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)
    //const escrowBalance = await this.getEscrowBalance(assetId, receiverAddress);
    //console.log({escrowBalance});
    assetId = parseInt(assetId)

    const outerTxns = await generateTransactions.getCloseEscrowTxns(algodClient, assetId,
      receiverAddress)
    const unsignedTxns = outerTxns.map( (outerTxn) => outerTxn.unsignedTxn)
    const groupID = algosdk.computeGroupID(unsignedTxns)
    for (let i = 0; i < outerTxns.length; i++) {
      outerTxns[i].unsignedTxn.group = groupID
    }
    console.log({outerTxns})
    return helper.signAndSendLsigTxns(algodClient, outerTxns)
  }

}

module.exports = RedeemAssets
