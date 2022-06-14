/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'teste,teste, teste, teste, teste, test, teste,teste, teste, teste, teste, test, teste,teste, teste, teste, teste, test,teste,teste, teste, teste, teste, test'
        cy.get('#firstName').type('Camila')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('Camila8925@hotmail.com')
        cy.get('#open-text-area').type(longText, {delay:0} )
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Camila')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('Camila8925@hotmail,com')
        cy.get('#open-text-area').type('teste' )
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('se um valor não-numérico for digitado, seu valor continuará vazio', function() {
        cy.get('#phone').type('abcvssfsf').should('have.value', '')

        
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Camila')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('Camila8925@hotmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste' )
        cy.contains('button', 'Enviar').click()
            
        cy.get('.error').should('be.visible')
        
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Camila').should('have.value', 'Camila').clear().should('have.value', '')
        cy.get('#lastName').type('Santos').should('have.value', 'Santos').clear().should('have.value', '')
        cy.get('#email').type('Camila8925@hotmail.com').should('have.value', 'Camila8925@hotmail.com').clear().should('have.value', '')
        cy.get('#phone-checkbox').click()
        cy.get('#phone').type('12345555').should('have.value', '12345555').clear().should('have.value', '')
        cy.get('#open-text-area').type('teste' )             
        
        
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()       
        
        cy.get('.error').should('be.visible')
        
        
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
        
        
    })
    
    it(' seleciona  um produto (Youtube) por seu texto', function() {
       cy.get('#product').select('youtube').should('have.value', 'youtube')
        
        
    })
    it(' seleciona  um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
        
         
     })
     it(' seleciona  um produto (blog) por seu indice', function() {
        cy.get('#product').select(1).should('have.value', 'blog')
         
         
     })

     it(' marca o tipo de atendimento "Feedback', function() {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
         
         
     })

     it(' marca cada tipo de atendimento ', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
         
         
     })
     it(' marca ambos checkboxes, depois desmarca o ultimo', function() {
        cy.get('input[type="checkbox"]')
         .check()
         .should('be.checked')
         .last()
         .uncheck()
         .should('not.be.checked')
    
        })

    it(' seleciona um arquivo de pasta fixtures', function() {
            cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
              expect($input[0].files[0].name).to.equal('example.json')
            })
        
        
            })

    it(' seleciona um arquivo de pasta fixtures', function() {
                cy.get('input[type="file"]')
                .should('not.have.value')
                .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
                .should(function($input) {
                  expect($input[0].files[0].name).to.equal('example.json')
                })
            })
    it(' seleciona um arquivo de pasta fixture para qual foi dada um alias', function() {
                cy.fixture('example.json').as('sampleFile')
                cy.get('input[type="file"]')
                  .selectFile('@sampleFile')
                  .should(function($input) {
                   expect($input[0].files[0].name).to.equal('example.json')
                
                })
            })
    it(' verifica que a política de privacidade abre em outra aba sem necessidade', function() {
                cy.get('#privacy a').should('have.attr', 'target', '_blank')
        })

    it(' verifica que a política de privacidade abre em outra aba sem necessidade', function() {
            cy.get('#privacy a')
              .invoke('removeAttr', 'target')
              .click()

            cy.contains('Talking About Testing').should('be.visible')
    })
})
