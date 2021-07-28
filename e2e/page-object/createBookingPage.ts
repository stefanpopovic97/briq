import { browser, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { setup } from "../support/setup";
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var assert = chai.assert;
var expect = chai.expect;
chai.config.includeStack = true;

export class BookingPage {

    numberOfPeople = "//button[contains(text(),'Number')]";
    paragraphOfNumberOfPeople = "//button[contains(text(),'Number')]//following-sibling::p";
    adultsPath = "//input[@id='adult']";
    childsPath = "//input[@id='child']";
    adultsButton = "//button[@data-filter-name='adult']";
    childsButton = "//button[@data-filter-name='child']";
    loader = "//div[@class='loading-indicator']//descendant::img";
    date = "//button[contains(text(),'Date')]";
    paragraphOfDate = "//button[contains(text(),'Date')]//following-sibling::p";
    datePicker2 = "//input[@placeholder='Pick a date']";
    datePicker = "//input[@placeholder='Date'][@type='text']";
    nextMonth = "//span[contains(@class,'next-month')]";
    dateButton = "//button[@data-filter-name='date']";
    activity = "//button[@aria-controls='activityfilter']";
    paragraphOfActivity = "//button[@aria-controls='activityfilter']//following-sibling::p";
    activityButton = "//button[contains(@data-filter-name,'activity')]";
    clickOnFirstLink = "//div[@style[not(contains(., 'none'))]]//child::a[@class='overlay-link']";
    wantThisButton = "//div[contains(@class,'actions')]//child::a[contains(@class,'sing')]";
    timeSelectorPath = "//label[@class='time-selector-slot ']";
    nextStepButton = "//button[@type='submit'][contains(text(),'Next')][contains(@class,'green')]";
    firstNameInput = "//input[@name='first_name']";
    lastNameInput = "//input[@name='last_name']"
    emailInput = "//input[@name='email']"
    telephoneInput = "//input[@name='tel']";
    acceptTerms = "//input[@name='terms']//parent::label";
    confirmationButton = "//button[@type='submit'][contains(text(),'confirm')]";
    payOnSiteButton = "//input[@name='payment']//parent::label";
    submitButton = "//button[@type='submit']";
    thanksTitle = "//h1";
    emailConfirmation = "//div[contains(@class,'success')]//child::p";

    enterNumberOfPeople = async function (adults, childs) {
        await setup.isVisible(this.numberOfPeople);
        let numberOfPeopleText = await browser.element(by.xpath(this.numberOfPeople)).getText();
        await expect(numberOfPeopleText).to.equal("Number of people");
        let paragraphOfNumberOfPeopleText = await browser.element(by.xpath(this.paragraphOfNumberOfPeople)).getText();
        await expect(paragraphOfNumberOfPeopleText).to.equal("How many people will join the activities?");
        if (adults === null || adults === "" || adults === 0) {
            await setup.isVisible(this.adultsPath);
        }
        else {
            await setup.isVisible(this.adultsPath);
            await setup.isNotStale(this.adultsPath);
            await setup.sendKeys(adults, this.adultsPath);
            await setup.isNotVisible(this.loader);
        }
        if (childs == null || childs == "" || childs == 0) {
            await setup.isVisible(this.childsPath);
            await browser.actions().sendKeys(protractor.Key.ENTER).perform();
            await setup.isVisible(this.adultsButton);
            await setup.checkAttributeValue(this.adultsButton, "data-filter-value", adults);
        }
        else {
            await setup.isVisible(this.childsPath);
            await setup.isNotStale(this.childsPath);
            await setup.sendKeys(childs, this.childsPath);
            await browser.actions().sendKeys(protractor.Key.ENTER).perform();
            await setup.isNotVisible(this.loader);
            await setup.isVisible(this.childsButton);
            await setup.checkAttributeValue(this.childsButton, "data-filter-value", childs);

            let numAdults = parseInt(adults);
            if (numAdults > 1) {
                await setup.isVisible(this.adultsButton);
                await setup.checkAttributeValue(this.adultsButton, "data-filter-value", adults);
            }
        }

    }

    selectDate = async function (day) {
        await setup.isNotVisible(this.loader);
        await setup.isVisible(this.date);
        await setup.isVisible(this.paragraphOfDate);
        let textOfDateParagraph = await browser.element(by.xpath(this.paragraphOfDate)).getText();
        await expect(textOfDateParagraph).to.equal("When do you want to pay us a visit?")
        await setup.isVisible(this.datePicker);
        await setup.isNotStale(this.datePicker);
        await setup.click(this.datePicker);
        await setup.isNotStale(this.datePicker);
        await setup.isVisible(this.nextMonth);
        await setup.click(this.nextMonth);
        await setup.click("//div[@class='dayContainer']//child::span[text() ='" + day + "']");
        await setup.isNotVisible(this.loader);
        await setup.isVisible(this.dateButton);
    }

    selectActivity = async function (activityName) {
        await setup.isNotVisible(this.loader);
        await setup.isVisible(this.activity);
        let activityParagraphText = await browser.element(by.xpath(this.paragraphOfActivity)).getText();
        await expect(activityParagraphText).to.equal("What do you want to do?");
        await setup.isVisible("//input[contains(@data-name,'" + activityName + "')]//ancestor::label");
        await setup.isNotStale("//input[contains(@data-name,'" + activityName + "')]//ancestor::label");
        await setup.click("//input[contains(@data-name,'" + activityName + "')]//ancestor::label");
        await setup.isNotVisible(this.loader);
        await setup.isVisible(this.activityButton);
    }

    addToBookingCart = async function () {
        await setup.isNotVisible(this.loader);
        await setup.isVisible(this.wantThisButton);
        await setup.isVisible(this.loader);
        let wantElements = element.all(by.xpath(this.wantThisButton));
        await wantElements.last().click();
    }

    selectTime = async function () {
        await setup.isNotVisible(this.loader);
        await setup.isVisible(this.timeSelectorPath);
        await setup.isNotStale(this.timeSelectorPath);
        let timeSelectors = element.all(by.xpath(this.timeSelectorPath));
        let randomTime = Math.floor(Math.random() * (await timeSelectors).length);
        await timeSelectors.get(randomTime).click();
        await setup.isVisible(this.nextStepButton);
        await setup.isNotStale(this.nextStepButton);
        await setup.click(this.nextStepButton);
    }

    enterUserDetails = async function (firstName, lastName, email, phoneNumber) {
        await setup.isNotVisible(this.loader);
        await setup.isVisible(this.firstNameInput);
        await setup.sendKeys(firstName, this.firstNameInput);
        await setup.isVisible(this.lastNameInput);
        await setup.sendKeys(lastName, this.lastNameInput);
        await setup.isVisible(this.emailInput);
        await setup.sendKeys(email, this.emailInput);
        await expect(email).to.contains("@");
        await setup.isVisible(this.telephoneInput);
        await setup.sendKeys(phoneNumber, this.telephoneInput);
        await setup.isVisible(this.acceptTerms);
        await setup.click(this.acceptTerms);
        await setup.isVisible(this.confirmationButton);
        await setup.click(this.confirmationButton);
    }
    clickOnConfirmButton = async function () {
        await setup.isNotVisible(this.loader);
        await setup.isVisible(this.payOnSiteButton);
        await setup.isNotStale(this.payOnSiteButton);
        await setup.click(this.payOnSiteButton);
        await setup.isNotVisible(this.loader);
        await setup.isVisible(this.submitButton);
        await setup.click(this.submitButton);
    }
    checkAllinformation = async function (firstName, email) {
        await setup.isNotVisible(this.loader);
        await setup.isVisible(this.thanksTitle);
        let titleText = await element(by.xpath(this.thanksTitle)).getText();
        await expect(titleText).to.contains(firstName);
        await setup.isVisible(this.emailConfirmation);
        let emailText = await element(by.xpath(this.emailConfirmation)).getText();
        await expect(emailText).to.contains(email);
    }

};

export const createBooking = new BookingPage();