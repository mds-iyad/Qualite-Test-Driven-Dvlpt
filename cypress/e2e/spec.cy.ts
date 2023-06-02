describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5173/')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('add note', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://127.0.0.1:5173/');
    cy.get('[data-testid="input-title"]').type('tom');
    cy.get('[data-testid="input-note"]').type('4');
    cy.get('[data-testid="input-comment"]').type("hello");
    cy.get('[data-testid="add-button"]').click();
    
    cy.get('[data-testid="note-title"]').should('have.text', 'tom')
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('delete note', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://127.0.0.1:5173/');
    cy.get('[data-testid="input-title"]').type('tom');
    cy.get('[data-testid="input-note"]').type('4');
    cy.get('[data-testid="input-comment"]').type("hello");
    cy.get('[data-testid="add-button"]').click();
    cy.get('.note-actions > :nth-child(2)').click();

    cy.get('[data-testid="note-title"]').should('not.have.text', 'tom')
    /* ==== End Cypress Studio ==== */
  });
})