
const Ajv = require('ajv')
const ajv = new Ajv()

const sendSchema = {
  type: 'object',
  properties: {
    ToWallet: {type: 'string', pattern: '^[A-Z2-7]{58}$'},
    Amount: {type: 'number'}
  },
  required: ['ToWallet', 'Amount'],
  additionalProperties: false
}

const returnSchema = {
  type: 'object',
  properties: {
    ToWallet: {type: 'string', pattern: '^[A-Z2-7]{58}$'},
    Amount: {type: 'number'}
  },
  required: ['ToWallet'],
  additionalProperties: false
}


const validateCSVRows = (rows, isSending) => {
  const schema = isSending ? sendSchema : returnSchema
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    if (!ajv.validate(schema, row)) {
      return {
        error: 'info',
        message: 'Schema error - please check wallet and amounts are in correct format '
        + 'with no blank spaces. ' +
          `Wallet: [${row.ToWallet}] Amount: [${row.Amount}]` +
          JSON.stringify(ajv.errors),
      }
    } else {
      console.debug('ajv validated!')
    }
  }
  return {error: false}
}

module.exports = validateCSVRows