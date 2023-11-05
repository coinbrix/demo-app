describe('Singularity demo app', () => {
  it('Visit demo app', () => {
    cy.userLoginWithGmail();
    // cy.visit('https://demo-qal.s9y.gg/');

    // cy.wait(6000);

    // cy.get('[data-cy-attr="sign-in"]').click();
    
    // cy.get('#SingularityEvent__wrapper__iframe')
    //   .should('have.attr', 'style')
    //   .and('include', 'display: block');

    // cy.wait(2000);

    // cy.frameLoaded('#SingularityEvent__wrapper__iframe');
    // cy.iframe().find('[data-cy-attr="social-login-Google"]').click();

  });

  // it('social login google', () => {
  //   cy.wait(5000);
  //   cy.get('[data-cy-attr="social-login-Google"]').click();
  // });
})