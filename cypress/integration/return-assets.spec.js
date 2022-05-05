
const formattedAddresses = [
  'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI',
]
const assetId = '33698417'

describe('Return assets Page', () => {
  beforeEach(() => {
    cy.visit('/return-assets')
  })

  
  it('should retgurn assets successfully', () => {
    cy.get('[data-testid=file-input]').attachFile('sample.csv')
    cy.contains(`${formattedAddresses[0]}`).click()
    cy.get('[data-testid=assetId-input]').type(`${assetId}`)
    cy.get('[data-testid=submit-btn]').click()
  })
})
