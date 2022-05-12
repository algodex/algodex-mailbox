
const formattedAddresses = [
  'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI',
]
const assetId = '33698417'

describe('Send assets Page', () => {
  beforeEach(() => {
    cy.visit('/send-assets')
  })

  
  it('should send assets successfully with or without the recipient opt-in', () => {
    cy.wait(3000)
    cy.get('[data-testid=file-input]').attachFile('sample.csv')
    cy.get('[data-testid=assetId-input]').should('be.visible')
    // cy.get('[data-testid=assetId-input]').type(`${assetId}`, { force: true })
    cy.get('input').eq(2).type(`${assetId}`, { force: true })
    cy.contains(`${formattedAddresses[0]}`).click({ force: true })
    cy.get('[data-testid=submit-btn]').click({ force: true })
  })

  it('Should not send to escrow if recipient is not opted in', () => {
    cy.wait(3000)
    cy.get('[data-testid=file-input]').attachFile('sample.csv')
    cy.get('[data-testid=assetId-input]').should('be.visible')
    cy.get('input').eq(4).click()
    cy.get('input').eq(2).type(`${assetId}`, { force: true })
    cy.contains(`${formattedAddresses[0]}`).click({ force: true })
    cy.get('[data-testid=submit-btn]').click()
  })
})
