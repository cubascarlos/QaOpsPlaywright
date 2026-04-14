const {test,expect, request} = require('@playwright/test')
const loginPayLoad = {userEmail: "carlos9cubas@gmail.com", userPassword: "Carlos9.com"}
const orderPayLoad = {orders: [{country: "Colombia", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
const {APIUtils} = require('../utils/APIUtils')


let token;
exports.token = token;
let orderId;


let response
test.beforeAll('Before All',async()=>{
    console.log('I am Before All')
    const apiContext = await request.newContext()
    const apiUtils = new APIUtils(apiContext,loginPayLoad)
    response = await apiUtils.createOrder(orderPayLoad)
})

test.beforeEach('Before Each', async()=>{
    console.log('I am Before Each')
})


test('@api Browser context validation error login', async({page})=>
{   
    await page.addInitScript(value =>{
        window.localStorage.setItem('token', value)
    }, response.token)
    //await page.waitForTimeout(3000)
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("button[routerLink*='myorders']").click()
    //validar orden registrar en orders
    await page.locator("tbody tr").first().waitFor()
    const rows = await page.locator("tbody tr")
    for(let i=0; i< await rows.count(); i++){
        const rowOrderId = await rows.nth(i).locator("th").textContent()
        if (response.orderId.includes(rowOrderId)){
            console.log('Si contiene')
            await rows.nth(i).locator("button").first().click()
            break
        }else{
            console.log('NO contiene')
        }
    }
    const orderIdDetails = await page.locator(".col-text").first().textContent()
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy()
});