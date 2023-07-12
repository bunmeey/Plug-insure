import {Login, Signup} from "../fixtures/selectors.js";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
let number = parseInt(Math.random()*10000000, 10);
let phone_number = '09034' + number;
let CategoryNames = 'QaLtd' + phone_number;
let BusinessCompanyName = 'Bunmeey_Co.Ltd' + phone_number;
let email = phone_number + '@yopmail.com';
let accFirstname = 'Fagbohungbe';
let accLastname = 'Oluwabunmi';


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

    // cy.intercept('POST',"https://plug-insure-auth.vercel.app/api/v1/user/signUp", (req)=>{
    //     req.reply((res) =>{
    //         const responseBody = res.body;
    //         cy.log(responseBody)
    //         res.send(responseBody)
    //     })
    // }).as('myRequest')

    cy.get(Signup.Code).click()
    cy.wait('@getEndpoint')
    cy.get('@getEndpoint').then((interception) =>{
        const responseBody = interception.response.body 
        cy.log(responseBody)
    })
        
})
    it("INVALID SIGNUP - I Should not be able to register a new user ith invalid details", function () {
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