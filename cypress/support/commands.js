
Cypress.Commands.add('validateAttr', (testId) => {
    cy.get(`${testId}`)
        .should('have.attr', 'required')
    cy.get(`${testId}`)
        .should('have.attr', 'maxlength', '255')
})

Cypress.Commands.add('sendForm', (inputsIdArray, dataInputsArray, selectIdArray, checkBoxIdArray, submit, selectOptionsArray = null) => {
    let nextOption = 0
    inputsIdArray.forEach((item, index) => {
        cy.get(`${item}`).then(() => {
            cy.get(`${item}`)
                .type(`${dataInputsArray[index]}`)
        })
    })
    selectIdArray.forEach((item) => {
        cy.get(`${item}`).then(() => {
            cy.get(`${item}`).select(selectOptionsArray[nextOption])
            nextOption++
        })
    })
    checkBoxIdArray.forEach((item) => {
        cy.get(`${item}`).then(() => {
            cy.get(`${item}`).click()
        })
    })
    cy.get(`${submit}`).click()
})
