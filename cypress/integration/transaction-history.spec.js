const formattedAddresses = [
  'NN3BAWDPHEJAPIGO3IDB6I4ITGUMYG3QMN26ZYICXEZM3QRWISGXUK6J4Y',
]
const assetId = '33698417'

describe('Transaction history page', () => {
  beforeEach(() => {
    cy.visit('/redeem-assets')
  })

  it('should query and display transaction history', () => {
    cy.get('[data-testid=senderAddress-input]').type(
      `${formattedAddresses[0]}`
    )
    cy.get('[data-testid=assetId-input]').type(`${assetId}`)
    // cy.get('[data-testid=submit-btn]').click()
  })
})
