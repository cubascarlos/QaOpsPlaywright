const { test, request, expect } = require("@playwright/test");
const loginPayLoad = { userEmail: "carlos9cubas@gmail.com", userPassword: "Carlos9.com" }
const orderPayLoad = { orders: [{ country: "Colombia", productOrderedId: "6960eac0c941646b7a8b3e68" }] }

const { APIUtils } = require('../utils/APIUtils')


let response
test.beforeAll('Before All', async () => {
    const apiContext = await request.newContext()
    const apiUtils = new APIUtils(apiContext, loginPayLoad)
    response = await apiUtils.createOrder(orderPayLoad)
})

test('NetworkTest 2 - Interceptin request', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token)
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("button[routerLink*='myorders']").click()
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69b1d78ef00ba51a65fb5af9' })
    )
    await page.locator("button:has-text('View')").first().click()
    await expect(page.locator('p').last()).toHaveText('You are not authorize to view this order')
    await page.pause()

})


test.only('Browser context Playwright Test - Validating error login', async ({ browser }) => {
    //CREACION DE INSTANCIA NAVEGADOR
    const context = await browser.newContext() // abre un navegador fresco, nuevo, nueva instancia | // crea un contexto, una sesion limpia o configurada(cache o cookies)
    const page = await context.newPage(); // crea una pagina nueva, una pestaña nueva

    //await page.route('**/*.css', route => route.abort())
    await page.route('**/*.{jpg,png,jpeg}', route => route.abort())

    //LOCATORS
    const inputUserName = page.locator('#username')
    const inputPassword = page.locator('[type="password"]')
    const btnSignIn = page.locator("#signInBtn")
    const cardTitles = page.locator(".card-body a")

    page.on('request', request => console.log('REQUEST URL  ' + request.url()))
    page.on('response', response => console.log('RESP URL ' +response.url(), 'RESP STATUS ' +response.status()))

    //ACCIONES EN LA PAGINA
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
    await inputUserName.fill('rahulshettyacademyy')
    await inputPassword.fill('Learning@830$3mK2')
    await btnSignIn.click()
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.")

    inputUserName.fill("")
    inputUserName.fill("rahulshettyacademy")
    btnSignIn.click()

    await page.waitForTimeout(3000);
    //OPCION 1
    console.log(await page.locator(".card-body a").nth(0).textContent())
    //OPCION 2
    console.log(await page.locator(".card-body a").first().textContent())
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles)
});



