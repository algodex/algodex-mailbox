
const formattedAddresses = [
  'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI',
]
const assetId = '33698417'

describe('Send assets Page', () => {
  beforeEach(() => {
    cy.visit('/send-assets')
  })

  
  it('should send assets successfully', () => {
    cy.wait(3000)
    cy.get('[data-testid=file-input]').attachFile('sample.csv')
    cy.get('[data-testid=assetId-input]').should('be.visible')
    cy.get('[data-testid=assetId-input]').type(`${assetId}`)
    cy.contains(`${formattedAddresses[0]}`).click()
    cy.get('[data-testid=submit-btn]').click()
  })
})
