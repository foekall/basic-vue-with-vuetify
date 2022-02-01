// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  // run vue basic application
  it('Visits the app root url', () => {
    cy.visit('http://localhost:8080');
    cy.contains('h1', 'News');
  });

  // search headline typing by keywords
  // it('Search news', () => {
  //   cy.wait(1500)
  //   cy.get('[data-cy=search]').type('cnn')
  //   cy.wait(5000)
  //   cy.get('[data-cy=search]').clear()
  //   cy.wait(5000)
  //   cy.get('[data-cy="headline-list"]').should('be.visible')
  // });

  // // click headline news to go details page
  // it('Go to news headline details page', () => {
  //   cy.wait(1500)
  //   cy.get('[data-cy="headline-list"]:first').click()
  // });

  // // back to home page
  // it('Go back to home page', () => {
  //   cy.wait(1500)
  //   cy.get('[data-cy="goback"]:first').click()
  // });

  // // click headline news to go details page
  // it('Go to news headline details page', () => {
  //   cy.wait(1500)
  //   cy.get('[data-cy="headline-list"]').eq(2).click()
  // });

  // // click headline news to go details page
  // it('Edit headline title', () => {
  //   cy.wait(1500)
  //   cy.get('[data-cy="edit-title"]').click()
  //   cy.wait(5000)
  //   cy.get('[data-cy="txttitle"]').clear()
  //   cy.get('[data-cy="txttitle"]').type('This is new title for headline')
  //   cy.get('[data-cy="update"]').click()
  // });

  // // back to home page
  // it('Go back to home page', () => {
  //   cy.wait(1500)
  //   cy.get('[data-cy="goback"]').click()
  //   cy.wait(1500)
  // });

  // // click headline news to go details page
  // it('Go to news headline details page', () => {
  //   cy.wait(1500)
  //   cy.get('[data-cy="headline-list"]').eq(3).click()
  // });

  // // click headline news to go details page
  // it('Visit detail page by click visited headline in right menu', () => {
  //   cy.wait(3000)
  //   cy.get('[data-cy="visited-headline"]').eq(1).click()
  //   cy.wait(3000)
  //   cy.get('[data-cy="visited-headline"]').eq(2).click()
  //   cy.wait(3000)
  //   cy.get('[data-cy="visited-headline"]').eq(1).click()

  // });

  // // back to home page
  // it('Go back to home page', () => {
  //   cy.wait(1500)
  //   cy.get('[data-cy="goback"]').click()
  //   cy.wait(1500)
  // });

  // open filter button to failter headlines news
  it('Processing for filter', () => {
    cy.wait(1500)
    // cy.get('[data-cy="open-filter"]').click()
    // cy.get('[type="checkbox"]').eq(3).check()
    // cy.get('[type="checkbox"]').eq(5).check()
    // cy.get('[type="checkbox"]').eq(7).check()
    // cy.get('[type="checkbox"]').eq(10).check()
    // cy.get('[type="checkbox"]').eq(20).check()
    // cy.get('[type="checkbox"]').eq(21).check()
    // cy.get('[type="checkbox"]').eq(19).check()
    // cy.get('[type="checkbox"]').eq(22).check()
    // cy.get('[type="checkbox"]').eq(30).check()
    // cy.get('[type="checkbox"]').eq(50).check()
    // cy.get('[type="checkbox"]').eq(23).check()
    // cy.get('[type="checkbox"]').eq(9).check()
    cy.wait(2500)
    cy.get('[data-cy="apply"]').click()
    cy.wait(1500)
    cy.get('[data-cy="open-filter"]').click()
    cy.wait(2500)
    cy.get('[data-cy="clear"]').click()
    cy.wait(2500)
    cy.get('[data-cy="apply"]').click()
  });

});
