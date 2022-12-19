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
  'KC2L7KRSQ7GQIILO4F4AQQCLDWHCPK2FVUSFIRXEONT6TJIOK44B3ZOYMM',
]
const assetId = '33698417'

describe('Send assets Page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-testid=launch-btn]').click()
  })
  it('Should send to multiple address with or without the recipient opt-in', () => {
    cy.wait(3000)
    cy.get('[data-testid=multiple-address-radio]').click()
    cy.get('[data-testid=file-input]').attachFile('sample.csv')
    cy.get('[data-testid=assetId-input]').should('be.visible')
    cy.get('[data-testid=assetId-input]').type(`${assetId}`)
    cy.wait(3000)
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
    cy.wait(3000)
    cy.contains(`${formattedAddresses[0]}`).click()
    cy.get('[data-testid=submit-btn]').click()
  })

  it('Should not send to escrow if recipient is not opted in', () => {
    cy.wait(3000)
    cy.get('[data-testid=multiple-address-radio]').click()
    cy.get('[data-testid=file-input]').attachFile('sample.csv')
    cy.get('[data-testid=assetId-input]').should('be.visible')
    cy.get('input').eq(6).click()
    cy.get('[data-testid=assetId-input]').type(`${assetId}`)
    cy.wait(3000)
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
    cy.wait(3000)
    cy.contains(`${formattedAddresses[0]}`).click()
    cy.get('[data-testid=submit-btn]').click()
  })

  it('Should send to single address with or without the recipient opt-in and redeem', () => {
    cy.get('[data-testid=single-address-radio]').click()
    cy.get('[data-testid=assetId-input]').should('be.visible')
    cy.get('[data-testid=amount-input]').type(1)
    cy.get('[data-testid=assetId-input]').should('be.visible')
    // cy.get('[data-testid=receiverAddress-input]').type(
    //   `${formattedAddresses[1]}`
    // )
    cy.get('input').eq(6).type(`${formattedAddresses[1]}`)

    cy.get('[data-testid=assetId-input]').type(`${assetId}`)
    cy.wait(4000)
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
    cy.contains(`${formattedAddresses[0]}`).click()
    cy.wait(300)
    cy.get('[data-testid=submit-btn]').click()
    cy.wait(30000)
    cy.get('[data-testid=shareableLink]')
      .should('have.attr', 'href')
      .then((href) => {
        cy.visit(href)
      })
    cy.wait(3000)
    cy.get('[data-testid=receiverAddress-input]').type(
      `${formattedAddresses[1]}`
    )
    cy.wait(3000)
    //Not actually redeeming it so that the sending wallet won't run out of token
    cy.get('[data-testid=statusMessage]').should('contain', 'available')
  })
})
