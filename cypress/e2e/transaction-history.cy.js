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

// const formattedAddresses = [
//   'NN3BAWDPHEJAPIGO3IDB6I4ITGUMYG3QMN26ZYICXEZM3QRWISGXUK6J4Y',
// ]
// const assetId = '33698417'

describe('Transaction history page', () => {
  beforeEach(() => {
    cy.visit('/transaction-history')
  })

  it('should query and display transaction history', () => {
    // cy.get('input').eq(2).type(`${formattedAddresses[0]}`)
    // cy.get('input').eq(1).type(`${assetId}`)
    // cy.wait(3000)
    // cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
    // cy.wait(4000)
    // cy.get('[data-testid=transaction-table]').should('be.visible')
  })
})
