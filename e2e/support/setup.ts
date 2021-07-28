var chai = require("chai");
import { browser, by, element, ExpectedConditions } from 'protractor';
var assert = chai.assert;
var expect = chai.expect;

var EC = ExpectedConditions;

class Setup {
    
    async click(locator) {
        try {
            let el = element(by.xpath(locator));
            await browser.wait(EC.elementToBeClickable(el));
            await el.click();
        } catch (error) {
            throw new Error(`Element not clickable using locator: ${locator} ! ----- ERROR: ${error}`)
        };
    }

    async sendKeys(input, locator) {
        try {
            let el = element(by.xpath(locator));
            await browser.wait(EC.elementToBeClickable(el));
            await el.clear();
            await el.sendKeys(input);
        } catch (error) {
            throw new Error(`Could not input data into element using locator: ${locator} ! ----- ERROR: ${error}`);
        }
    }

    async isVisible(locator) {
        try {
            let el = element.all(by.xpath(locator));
            await browser.wait(EC.visibilityOf(el.last()), 20000);
        } catch (error) {
            throw new Error(`Element with locator ${locator} does not exist or it is not visible ! ----- ERROR: ${error}`)
        }
    }

    async isNotVisible(locator) {
        try {
            let el = element(by.xpath(locator));
            await browser.wait(EC.invisibilityOf(el), 30000);
        } catch (error) {
            throw new Error(`Element with locator ${locator} is still visible although it shouldn't be! ----- ERROR: ${error}`)
        }
    }

    async checkAttributeValue(locator, attribute, value) {
        try {
            let el = element(by.xpath(locator));
            await expect(await el.getAttribute(attribute)).to.include(value);
        } catch (error) {
            throw new Error(`Element with locator ${locator} does not seem to have ${value} as ${attribute}! ----- ERROR: ${error}`)
        }
    }

    async getText(locator) {
        try {
            let el = element(by.xpath(locator));
            let txt = await el.getText();
            return txt;
        } catch (error) {
            throw new Error(`Element : ${locator} not found! ----- ERROR: ${error}`)
        }
    }

    async isNotStale(locator) {
        try {
            let el = element.all(by.xpath(locator));
            await browser.wait(EC.visibilityOf(el.last()), 50000);
            await browser.wait(EC.not(EC.stalenessOf(el.last())), 50000);
        } catch (error) {
            throw new Error(`Element with locator ${locator} is still stale! ----- ERROR: ${error}`)
        }
    }
};

export const setup = new Setup();