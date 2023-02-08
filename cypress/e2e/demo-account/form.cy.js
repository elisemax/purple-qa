/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Demo account form', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  const inputsIdArray = ['#firstname', '#lastname', '#countryLabel', '#email', '#phone', '#deposit']
  const selectIdArray = ['#accountType', '#leverage', '#currency']
  const checkBoxIdArray = ['#iAgreeDemo']
  const selectOptionsArray = [1, 1, 1]


  it('Validate input data form', () => {

    const dataInputsArrayInvalidMail = ['41234RAef', 'Taga32ro', '545t3g', 'hello323rFFDfress.io', '12f5454', '10000000000000']

    cy.validateAttr('#firstname')
    cy.validateAttr('#lastname')
    cy.validateAttr('#email')
    cy.validateAttr('#phone')
    cy.get('#deposit').should('have.attr', 'min', '1000')
    cy.get('#deposit').should('have.attr', 'max', '10000000')
    cy.get('#deposit').should('have.attr', 'required')
    cy.sendForm(inputsIdArray, dataInputsArrayInvalidMail, selectIdArray, checkBoxIdArray, '[type="submit"]', selectOptionsArray)
    cy.get('input:invalid').should('have.length', 6)
    cy.visit('/')

  })

  it('Validate input with japan language', () => {

    const dataInputsArrayJapanese = ['山田', '太郎', 'Japan', 'hello@cypress.io', '1234567890', '1000']


    cy.sendForm(inputsIdArray, dataInputsArrayJapanese, selectIdArray, checkBoxIdArray, '[type="submit"]', selectOptionsArray)
    cy.get('input:invalid').should('have.length', 0)

  })

  it('Verify submisions entered data', () => {

    const dataInputsArray = ['Yamada', 'Taro', 'Japan', 'hello@cypress.io', '1234567890', '1000']


    cy.intercept('**/registration/submit-form').as('newPosts')
    cy.sendForm(inputsIdArray, dataInputsArray, selectIdArray, checkBoxIdArray, '[type="submit"]', selectOptionsArray)
    cy.get('input:invalid').should('have.length', 0)

    cy.wait('@newPosts').then((interception) => {
      expect(interception.response.statusCode).to.equal(302)
    })

  })
})
