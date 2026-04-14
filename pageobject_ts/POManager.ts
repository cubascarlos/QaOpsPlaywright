import { type Page } from '@playwright/test'

import { LoginPage } from './LoginPage'
import { DashboardPage } from '../pageobject/DashboardPage'
import { CartPage } from '../pageobject/CartPage'
import { OrdersHistoryPage } from '../pageobject/OrdersHistoryPage'
import { OrdersReviewPage } from '../pageobject/OrdersReviewPage'

export class POManager {

    page: Page
    loginPage: LoginPage
    dashboardPage: DashboardPage
    cartPage: CartPage
    ordersHistoryPage: OrdersHistoryPage
    ordersReviewPage: OrdersReviewPage

    constructor(page: any) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.cartPage = new CartPage(this.page)
        this.ordersHistoryPage = new OrdersHistoryPage(this.page)
        this.ordersReviewPage = new OrdersReviewPage(this.page)
    }

    getLoginPage() {
        return this.loginPage
    }

    getDashboard() {
        return this.dashboardPage
    }

    getCartPage() {
        return this.cartPage
    }

    getOrdersHistoryPage() {
        return this.ordersHistoryPage
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage
    }
}