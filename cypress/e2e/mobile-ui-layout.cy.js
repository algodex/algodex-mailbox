// const sizes = ['iphone-6', 'iphone-x', 'samsung-s10', 'samsung-note9']
// function clear() {
//   cy.clearLocalStorage()
// }
// describe('Mailbox Mobile Layout', () => {
//   beforeEach(clear)
//   afterEach(clear)
//   sizes.forEach((size) => {
//     it(`Should render landing and send assets page on ${size} screen`, () => {
//       cy.viewport(size)
//       cy.visit('/')
//       cy.get('[data-testid=app-bar]').should('be.visible')
//       cy.get('[data-testid=menu-btn]').should('be.visible')
//       cy.get('[data-testid=toolbar-links]').should('not.exist')
//       cy.get('[data-testid=launch-btn]').click()
//       cy.url().should('include', '/send-assets')
//       cy.location('pathname').should('eq', '/send-assets')
//       cy.get('[data-testid=app-bar]').should('be.visible')
//       cy.get('[data-testid=environment-selection]').should('be.visible')
//       cy.get('[data-testid=bottom-nav]').should('be.visible')
//     })
//   })
// })
