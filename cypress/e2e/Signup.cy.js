import {Login, Signup} from "../fixtures/selectors.js";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
let number = parseInt(Math.random()*10000000, 10);
let phone_number = '09034' + number;
let email = phone_number + '@yopmail.com';

describe("SIGN UP", function () {
    beforeEach(function () {
          cy.intercept('POST','/api/v1/user/signUp').as('getEndpoint')
        cy.visit("/")
    });

it("VALID SIGNUP - I Should be able to register a new user", function () {
    cy.get(Login.loginBtn).click()
    cy.get(Login.createAccount).click()
    cy.get(Signup.Firstname).type("bunmi")
    cy.get(Signup.Lastname).type("funke")
    cy.get(Signup.Emailaddress).type(email)
    cy.wait(1000)
    cy.contains('An OTP would be sent to the email address you provide.').should('be.visible')
    cy.get(Signup.Password).type("TobiBum1@")
    cy.get(Signup.Confirmpassword).type("TobiBum1@")
    cy.get(Signup.Code).click()

        
})
    it("INVALID SIGNUP - I Should not be able to register a new user with invalid details", function () {
        cy.get(Login.loginBtn).click()
        cy.get(Login.createAccount).click()
        cy.contains('Get Better insurance for Less.').should('be.visible')
        cy.get(Signup.Firstname).type("bunmi")
        cy.get(Signup.Lastname).type("funke")
        cy.get(Signup.Emailaddress).type('bunmeey.com')
        cy.wait(1000)
        cy.contains('Enter valid email').should('be.visible')
        cy.get(Signup.Password).type("TobiBum1@")
        cy.get(Signup.Confirmpassword).type("TobiBum1@")
    
});
});