describe('Set of basic tests', () => {
  it('All cards are loaded', () => {
    cy.visit('http://localhost:4200');
    cy.get('mat-card').should('have.length', 50);
  });

  it('No filter result', () => {
    cy.visit('http://localhost:4200');
    cy.get('mat-select[formControlName=supertype]')
      .click()
      .get('mat-option')
      .contains('Energy')
      .click();
    cy.get('form').contains('Filter').click();
    cy.contains('There are no matching cards');
  });

  it('Reset Filters', () => {
    cy.visit('http://localhost:4200');
    cy.get('mat-select[formControlName=supertype]')
      .click()
      .get('mat-option')
      .contains('Trainer')
      .click();
    cy.get('form').contains('Filter').click();
    cy.contains('There are no matching cards');
    cy.get('form').contains('Clear filters').click();
    cy.contains('There are no matching cards').should('not.exist');
  });

  it('Open details dialog', () => {
    cy.visit('http://localhost:4200');
    cy.get('#card-1').click();
    cy.get('.mat-mdc-dialog-container').should('exist');
  });

  it('Close details dialog', () => {
    cy.visit('http://localhost:4200');
    cy.get('#card-1').click();
    cy.get('.mat-mdc-dialog-container').should('exist');
    cy.contains('Close').click();
    cy.get('.mat-mdc-dialog-container').should('not.exist');
  });

  it('Edit hit points', () => {
    cy.visit('http://localhost:4200');
    cy.get('#card-1').click();
    cy.get('.mat-mdc-dialog-container').should('exist');
    cy.contains('Hit points: 50');
    cy.contains('Edit').click();
    cy.get('input[formControlName=hitPointsEdit]').clear().type('100');
    cy.contains('Apply changes').click();
    cy.get('#card-1').click();
    cy.contains('Hit points: 100');
  });

  it('Show only number hint during card edit', () => {
    cy.visit('http://localhost:4200');
    cy.get('#card-1').click();
    cy.get('.mat-mdc-dialog-container').should('exist');
    cy.contains('Hit points: 50');
    cy.contains('Edit').click();
    cy.get('input[formControlName=hitPointsEdit]').clear().type('o');
    cy.contains('Only numbers');
  });
});
