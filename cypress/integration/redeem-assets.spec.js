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
    cy.wait(3000)
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
    cy.wait(3000)
    cy.get('[data-testid=submit-btn]').then(($button) => {
      if ($button.is('enabled')) {
        cy.get($button).click()
      }
    })
  })
})
