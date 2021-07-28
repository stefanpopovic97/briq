import { browser } from "protractor";
import { createBooking } from "../page-object/createBookingPage";
var { Given, When, Then, setDefaultTimeout } = require("cucumber");
var data = require('../data/data.json');

setDefaultTimeout(60 * 10000);

Given("the user is navigated to the portal page", async function () {
       await browser.get(data.url);
});

Given("the user enters number of people to join the activities", async function () {
       await createBooking.enterNumberOfPeople(data.adults, data.childs);
});

Given("the user enters date for the visit", async function () {
       await createBooking.selectDate(data.day);
});

Given("the user chooses which activities", async function () {
       await createBooking.selectActivity(data.activityName);
});

Given("the user clicks on the button to add to cart", async function () {
       await createBooking.addToBookingCart();
});

Given("the user selects time for check in", async function () {
       await createBooking.selectTime();
});

Given("the user enters personal information", async function () {
       await createBooking.enterUserDetails(data.firstName, data.lastName, data.email, data.phone);
});

When("the user clicks on confirmation button", async function () {
       await createBooking.clickOnConfirmButton();
});


Then("the bookings is created successfully", async function () {
       await createBooking.checkAllinformation(data.firstName, data.email);
});