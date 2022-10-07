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
  'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI',
]
const assetId = '33698417'

describe('Return assets Page', () => {
  beforeEach(() => {
    cy.visit('/return-assets')
  })

  it('Should return assets from multiple addresses', () => {
    cy.get('[data-testid=multiple-address-radio]').click({ force: true })
    cy.get('[data-testid=file-input]').attachFile('sample.csv')
    cy.wait(3000)
    cy.get('input').eq(2).type(`${assetId}`, { force: true })
    cy.wait(3000)
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
    cy.wait(3000)
    cy.contains(`${formattedAddresses[0]}`).click({ force: true })
    cy.get('[data-testid=submit-btn]').click({ force: true })
  })

  it('Should return assets from a single address', () => {
    cy.get('[data-testid=single-address-radio]').click({ force: true })
    cy.wait(3000)
    cy.get('input').eq(6).type(`${formattedAddresses[0]}`, { force: true })
    cy.get('input').eq(2).type(`${assetId}`, { force: true })
    cy.wait(3000)
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
    cy.wait(3000)
    cy.contains(`${formattedAddresses[0]}`).click({ force: true })
    cy.get('[data-testid=submit-btn]').click({ force: true })
  })
})
