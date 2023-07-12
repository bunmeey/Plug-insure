import {Login} from "../../fixtures/selectors.js";


describe("Given I am on the onboarding page", function () {
    beforeEach(function () {
        cy.visit('/')

    });


    it("LOGIN - I Should be able to login into my account with valid email and password", function () {
        cy.get(Login.loginBtn).click()
        cy.wait(2000)
        cy.contains('Enter your Password to continue.').should("be.visible")
        cy.get(Login.Emailaddress).type("bukky@yopmail.com")
        cy.get(Login.Password).type("Bunmi123@")
        cy.get(Login.Showorhide).click()
        cy.get(Login.Submit).click()
        cy.wait(2500)
        cy.contains("Success").should('be.visible')
        cy.wait(1000)
        cy.get('[href="/"] > img').should('be.visible')
        cy.contains('Get Better Insurance for Less.').should('be.visible')
      
    })

    it("INVALIDLOGIN - I Should not be able to login into my account with invalid email and password", function () {
        cy.get(Login.loginBtn).click()
        cy.contains('Enter your Password to continue.').should("be.visible")
        cy.get(Login.Emailaddress).type("bukkyyopmail.com")
        cy.get(Login.Password).type("unmi123")
        cy.get(Login.Showorhide).click()
        cy.get(Login.Submit).click()
        cy.contains("Email cannot be empty").should("be.visible")
        cy.wait(1000)
        cy.contains("Password must be at least 8 characters").should("be.visible")

})
})
