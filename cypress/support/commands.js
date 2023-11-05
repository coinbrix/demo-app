// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

require('cypress-iframe');

Cypress.Commands.add('userLoginWithGmail', () => {
    const socialLoginOptions = {
        username: 'test@gmail.com',
        password: 'test@1234',
        loginUrl: 'https://demo-qal.s9y.gg/?isAutomation=true',
        headless: false,
        logs: true,
        loginSelectorDelay: 8000,
        loginSelector: "[data-cy-attr='sign-in']",
        // preLoginSelectorIframe: "[data-cy-attr='social-login-Google']",
        // preLoginSelector: "[data-cy-attr='social-login-Google']",
        // preLoginSelectorIframeDelay: 6000,
        popupDelay: 3000,
        cookieDelay: 2000,
        args: [' — disable-web-security', ' — user-data-dir', ' — allow-running-insecure-content'],
        isPopup: true,
        getAllBrowserCookies: true
    }
    
    cy.task('customizedLogin', socialLoginOptions).then(() => {
        // cookies && cookies.map((cookie) => {
        //     cy.setCookie(cookie.name, cookie.value, {
        //         domain: cookie.domain,
        //         expiry: cookie.expires,
        //         httpOnly: cookie.httpOnly,
        //         path: cookie.path,
        //         secure: cookie.secure
        //     })
        //     Cypress.Cookies.defaults({
        //         preserve: cookie.name
        //     })
        // });
        // cy.window().then(window => {
        //     Object.keys(ssd).forEach(key => window.sessionStorage.setItem(key, ssd[key]))
        //     Object.keys(lsd).forEach(key => window.localStorage.setItem(key, lsd[key]))
        // })
        // cy.log('login successful.')
        // cy.visit('/');
    })
})