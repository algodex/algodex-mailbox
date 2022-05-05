
const formattedAddresses = [
  'NN3BAWDPHEJAPIGO3IDB6I4ITGUMYG3QMN26ZYICXEZM3QRWISGXUK6J4Y',
]
const assetId = '33698417'

describe('Send assets Page', () => {
  beforeEach(() => {
    cy.visit('/send-assets')
  })
  // it('should connect wallet successfully', () => {
  //   cy.get('[data-testid=connect-wallet-btn]').should('be.visible')
  //   cy.get('[data-testid=connect-wallet-btn]').click()
  //   // cy.location('pathname').should('eq', 'https://wallet.myalgo.com/bridge/connect.html')
  // })
  
  it('should send assets successfully', () => {
    cy.get('[data-testid=assetId-input]').should('be.visible')
    cy.get('[data-testid=assetId-input]').type(`${assetId}{enter}`)
    // cy.get('[data-testid=wallet-radio-input]').should('be.visible')
    // cy.get('[data-testid=wallet-radio-input]').check(`${formattedAddresses[0]})
  })
})
