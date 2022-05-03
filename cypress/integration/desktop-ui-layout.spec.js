
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
    it(`Should render home and send asset on ${size} screen`, () => {
      cy.viewport(size)
      cy.visit('/')
      cy.get('[data-testid=app-bar]').should('be.visible')
      cy.get('[data-testid=toolbar-links]').should('be.visible')
      cy.get('[data-testid=launch-btn]').click()
      cy.url().should('include', '/send-assets')
      cy.location('pathname').should('eq', '/send-assets')
      cy.get('[data-testid=app-bar]').should('be.visible')
      cy.get('[data-testid=environment-selection]').should('be.visible')
      cy.get('[data-testid=page-title]').should('be.visible')
      cy.get('[data-testid=drawer]').should('be.visible')
    })
  })
})
