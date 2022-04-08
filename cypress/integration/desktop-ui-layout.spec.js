
const sizes = [
  'ipad-mini',
  'macbook-11',
  'macbook-13',
  'macbook-15',
  'macbook-16'
]

function clear() {
  cy.clearLocalStorage()
}
describe('Mailbox Desktop Layout', () => {
  beforeEach(clear)
  afterEach(clear)
  sizes.forEach((size) => {
    it(`Should render send asset on ${size} screen`, () => {
      cy.viewport(size)
      cy.visit('/en/send-assets')
      cy.get('[data-testid=nav-desktop-send-assets]').should('be.visible')
    })
  })
})
