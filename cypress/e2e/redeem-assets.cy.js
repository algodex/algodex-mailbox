/* 
 * Algodex Mailbox 
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

const formattedAddresses = [
  'KC2L7KRSQ7GQIILO4F4AQQCLDWHCPK2FVUSFIRXEONT6TJIOK44B3ZOYMM',
]
const assetId = '33698417'

describe('Redeem assets Page', () => {
  beforeEach(() => {
    cy.visit('/redeem-assets')
  })

  it('should redeem assets successfully', () => {
    cy.get('[data-testid=senderAddress-input]').type(
      `${formattedAddresses[0]}`
    )
    cy.get('[data-testid=receiverAddress-input]').type(
      `${formattedAddresses[0]}`
    )
    cy.get('[data-testid=assetId-input]').type(`${assetId}`)
    cy.wait(3000)
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
    cy.get('[data-testid=submit-btn]').then(($button) => {
      if ($button.is('enabled')) {
        cy.get($button).click()
      }
    })
  })
})
