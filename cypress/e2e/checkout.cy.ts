describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('GTX Market')
  });

  it('Add item to Shopping Cart', () => {
    cy.get('[data-cy="add-item-0"]').click()
  });

  it('Remove item from Shopping Cart', () => {
    cy.get('[data-cy="remove-item-0"]').click()
  });

  it('Add item to Shopping Cart', () => {
    cy.get('[data-cy="add-item-1"]').click()
  });

  it('Open Shopping Cart', () => {
    cy.get('[data-cy="shopping-cart-button"]').click()
  });

  it('Increase item quantity', () => {
    cy.get('[data-cy="increase-item-0"]').click()
  });

  it('Decrease item quantity', () => {
    cy.get('[data-cy="decrease-item-0"]').click()
  });

  it('Remove item quantity', () => {
    cy.get('[data-cy="remove-item-0"]').click()
  });
})
