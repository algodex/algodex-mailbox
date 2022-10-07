/* 
 * Algodex Service 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/* eslint-disable @typescript-eslint/no-var-requires */

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