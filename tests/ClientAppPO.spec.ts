import { expect, test } from "@playwright/test";
import { customtest } from "../utils_ts/test-base"
import { POManager } from '../pageobject/POManager'

const dataSet = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')))

test('Browser context validation error login', async ({ page }) => {
    const poManager = new POManager(page)
    const loginPage = poManager.getLoginPage()
    await loginPage.goTo()
    await poManager.getLoginPage().validLogin(dataSet.userName, dataSet.password)

    const dashboardPage = poManager.getDashboard()
    await dashboardPage.searchProductAddCart(dataSet.productName)
    await dashboardPage.navigateToCart()

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(dataSet.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");

    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

for(const data of dataSet){
test(`Browser context validation error login for ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page)
    const loginPage = poManager.getLoginPage()
    await loginPage.goTo()
    await poManager.getLoginPage().validLogin(data.userName, data.password)

    const dashboardPage = poManager.getDashboard()
    await dashboardPage.searchProductAddCart(data.productName)
    await dashboardPage.navigateToCart()

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");

    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

})};

customtest.only('Browser context validation error login with test base', async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page)
    const loginPage = poManager.getLoginPage()
    await loginPage.goTo()
    await poManager.getLoginPage().validLogin(testDataForOrder.userName, testDataForOrder.password)
    const dashboardPage = poManager.getDashboard()
    await dashboardPage.searchProductAddCart(testDataForOrder.productName)
    await dashboardPage.navigateToCart()
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
