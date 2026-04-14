const { Given, When, Then } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobject/POManager');
const { expect } = require('@playwright/test')
const playwright = require('@playwright/test')


Given('a login to ecomerce application with {string} and {string}',{timeout:15*1000},  async function (userName, pass) {
    const loginPage = this.poManager.getLoginPage()
    await loginPage.goTo()
    //await poManager.getLoginPage().validLogin(testDataForOrder.userName, testDataForOrder.password)
    await this.poManager.getLoginPage().validLogin(userName, pass)
});

When('add {string} to cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboard()
    await this.dashboardPage.searchProductAddCart(productName)
    await this.dashboardPage.navigateToCart()
});

When('verify {string} is displayed in the cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

When('enter valid details and place the order', async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");

    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('verify order in preset in the order History', async function () {
    await this.dashboardPage.navigateToOrders();

    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});