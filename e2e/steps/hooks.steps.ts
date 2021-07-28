import { browser } from 'protractor';
let { After, Before, AfterAll, BeforeAll } = require('cucumber');


BeforeAll(async function () {    
    browser.waitForAngularEnabled(false);
    browser.manage().deleteAllCookies();
    browser.manage().window().maximize();
});

AfterAll(async function () {
    browser.close();
});