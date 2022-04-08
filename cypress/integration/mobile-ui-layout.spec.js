const sizes = [
  'iphone-6',
  'iphone-x',
  'samsung-s10',
  'samsung-note9',
]
function clear() {
  cy.clearLocalStorage()
}
describe('Mailbox Mobile Layout', () => {
  beforeEach(clear)
  afterEach(clear)
  sizes.forEach((size) => {
    it(`Should render send asset on ${size} screen`, () => {
      cy.viewport(size)
      cy.visit('/en/send-assets')
      cy.get('[data-testid=nav-mobile-send-assets]').should('be.visible')
    })
  })
})
