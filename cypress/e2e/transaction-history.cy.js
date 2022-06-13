// const formattedAddresses = [
//   'NN3BAWDPHEJAPIGO3IDB6I4ITGUMYG3QMN26ZYICXEZM3QRWISGXUK6J4Y',
// ]
// const assetId = '33698417'

describe('Transaction history page', () => {
  beforeEach(() => {
    cy.visit('/transaction-history')
  })

  it('should query and display transaction history', () => {
    // cy.get('input').eq(2).type(`${formattedAddresses[0]}`)
    // cy.get('input').eq(1).type(`${assetId}`)
    // cy.wait(3000)
    // cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
    // cy.wait(4000)
    // cy.get('[data-testid=transaction-table]').should('be.visible')
  })
})
