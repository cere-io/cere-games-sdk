describe('Game', () => {
  beforeEach(() => {
    cy.visit('/metaverse-dash-run/');
  });

  describe('Preloader', () => {
    beforeEach(() => {
      cy.get('cere-modal cere-preloader').as('preloader');
    });

    it('should be shown', () => {
      cy.get('@preloader').should('exist');
    });

    it('should be closed after clicking start button', () => {
      cy.get('@preloader').shadow().contains('Start').click();
      cy.get('@preloader').should('not.exist');
    });
  });
});
