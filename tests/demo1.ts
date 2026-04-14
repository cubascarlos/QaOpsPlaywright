import { expect, type Locator, type Page } from '@playwright/test'

let message1: string = "Hello"
message1 = "Bye"
console.log(message1)
let age1: number = 28
console.log(age1)

let isActive1: boolean = false
let numberArray: number[] = [1, 2, 3]
let data: any = "This could be anything" //funcionara como JS
data = 42

function add(a: number, b: number): number {
    return a + b
}

add(3, 4)

let user: { name: string, age: number, location: string } = { name: "Bob", age: 28, location: "Lima" }
user.location = "Lima"

class CartPage {

    page: Page
    cartProducts: Locator
    productsText: Locator
    cart: Locator
    orders: Locator
    checkout: Locator

    constructor(page: Page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");
    }

    async VerifyProductIsDisplayed(productName: string) {
        //await this.page.waitForTimeout(1000)
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    async Checkout() {
        await this.checkout.click();
    }

    getProductLocator(productName:  string) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }
}