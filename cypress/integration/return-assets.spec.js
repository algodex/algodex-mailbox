const formattedAddresses = [
  'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI',
]
const assetId = '33698417'

describe('Return assets Page', () => {
  beforeEach(() => {
    cy.visit('/return-assets')
  })

  it('Should return assets to multiple addresses', () => {
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

  it('Should return assets to a single address', () => {
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
