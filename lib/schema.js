const Ajv = require('ajv')

let ajv
module.exports = (function(){
  if(!( ajv instanceof Ajv)){
    ajv = new Ajv({allErrors: true})

    // Define Schemas
    // TODO: Host schemas to remove them from the bundle
    const schemas = {
      'Asset.id': require('../spec/Asset/Index.json'),
      'Wallet.address': require('../spec/Wallet/Address.json'),
      'Transaction.RedeemFromMailbox': require('../spec/Transactions/RedeemFromMailbox.json'),
      'Transaction.SendToMailbox': require('../spec/Transactions/SendToMailbox.json'),
      'Transaction': require('../spec/Transaction.json'),
    }
    // Add Schemas to AJV
    Object.keys(schemas).forEach((key)=>{
      ajv.addSchema(schemas[key], key)
    })
  }
  return ajv
})()
