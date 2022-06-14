Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Camila')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('Camila8925@hotmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()


})