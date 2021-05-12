describe("Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  })

  it('should have working number buttons', () => {
    cy.get('#number2').click();
    cy.get('.display').should('contain', '2')
  })

  it('should update total when multiple buttons are pressed', () => {
    cy.get('#number1').click();
    cy.get('#number2').click();
    cy.get('#number3').click();
    cy.get('#number4').click();
    cy.get('#number5').click();
    cy.get('#number6').click();
    cy.get('#number7').click();
    cy.get('#number8').click();
    cy.get('#number9').click();
    cy.get('#number0').click();

    cy.get('.display').should('contain', '1234567890');
  });

  it('should update total when arithmetic operation is complete (at equals)', () => {
    cy.get('#number5').click();
    cy.get('#operator_multiply').click();
    cy.get('#number2').click();
    cy.get('#operator_equals').click();

    cy.get('.display').should('contain', '10');
  });
  
  it('should be able to chain multiple operations', () => {
    cy.get('#number5').click();
    cy.get('#operator_multiply').click();
    cy.get('#number2').click();
    cy.get('#operator_equals').click();
    cy.get('#operator_add').click();
    cy.get('#number9').click();
    cy.get('#number5').click();
    cy.get('#operator_equals').click();

    cy.get('.display').should('contain', '105');
  });

  it('it should be able to display negative numbers', () => {
    cy.get('#number5').click();
    cy.get('#operator_subtract').click();
    cy.get('#number9').click();
    cy.get('#operator_equals').click();

    cy.get('.display').should('contain', '-4');
  });

  it('should be able to display floating point numbers', () => {
    cy.get('#number1').click();
    cy.get('#number0').click();
    cy.get('#operator_divide').click();
    cy.get('#number4').click();
    cy.get('#operator_equals').click();

    cy.get('.display').should('contain', '2.5');
  });

  it('should handle very large numbers', () => {
    cy.get('#number1').click();
    for(let i = 0; i<10; i++) {
      cy.get('#number0').click();
    };

    cy.get('#operator_multiply').click();
    
    cy.get('#number1').click();
    for(let i = 0; i<10; i++) {
      cy.get('#number0').click();
    };

    // handles correctly but display rolls off the end of the screen
    cy.get('#operator_equals').click();
    cy.get('.display').should('contain', '100000000000000000000');
  });

  it('should gracefully handle divide by zero', () => {
    cy.get('#number1').click();
    cy.get('#number0').click();
    cy.get('#operator_divide').click();
    cy.get('#number0').click();
    cy.get('#operator_equals').click();

    //currently displays infinity
    cy.get('.display').should('contain', 'Error: Cannot divide by zero');
  });
})