const {test, request} = require("@playwright/test")
const loginPayLoad = {userEmail: "carlos9cubas@gmail.com", userPassword: "Carlos9.com"}
const orderPayLoad = {orders: [{country: "Colombia", productOrderedId: "6960eac0c941646b7a8b3e68"}]}

const {APIUtils} = require('../utils/APIUtils')
const fakePayLoadOrders = {message:"No Product in Cart"}

let response
test.beforeAll('Before All',async()=>{
    const apiContext = await request.newContext()
    const apiUtils = new APIUtils(apiContext,loginPayLoad)
    response = await apiUtils.createOrder(orderPayLoad)
})
//LECTION 65
test.only('Browser context validation error login', async({page})=>
{   
    await page.addInitScript(value =>{
        window.localStorage.setItem('token', value)
    }, response.token)
    await page.goto("https://rahulshettyacademy.com/client")

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async route=>{
            const response = await page.request.fetch(route.request())
            let body = JSON.stringify(fakePayLoadOrders)
            route.fulfill(
                {
                    response,
                    body
                }
            )
        }
    )
    await page.locator("button[routerLink*='myorders']").click()
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63475756c4d0c51f4f3c9259')
    //validar orden registrar en orders
    console.log(await page.locator(".mt-4").textContent())

    })