const formattedAddresses = [
  'NN3BAWDPHEJAPIGO3IDB6I4ITGUMYG3QMN26ZYICXEZM3QRWISGXUK6J4Y',
]
const assetId = '33698417'

describe('Return assets Page', () => {
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
    // cy.get('[data-testid=submit-btn]').click()
  })
})
