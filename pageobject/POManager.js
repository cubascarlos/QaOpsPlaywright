const {LoginPage} = require('../pageobject/LoginPage')
const {DashboardPage} = require('../pageobject/DashboardPage')
const {CartPage } = require('../pageobject/CartPage')
const {OrdersHistoryPage} = require('../pageobject/OrdersHistoryPage')
const {OrdersReviewPage } = require('../pageobject/OrdersReviewPage')

class POManager{

    constructor(page){
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.cartPage = new CartPage(this.page)
        this.ordersHistoryPage = new OrdersHistoryPage(this.page)
        this.ordersReviewPage = new OrdersReviewPage(this.page)
    }

    getLoginPage(){
        return this.loginPage
    }

    getDashboard(){
        return this.dashboardPage
    }

    getCartPage(){
        return this.cartPage
    }

    getOrdersHistoryPage(){
        return this.ordersHistoryPage
    }

    getOrdersReviewPage(){
        return this.ordersReviewPage
    }
}
module.exports = {POManager}