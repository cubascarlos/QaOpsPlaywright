const {test, expect } = require("@playwright/test");
let webContext

test.beforeAll('Baefore All', async ({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").fill("carlos9cubas@gmail.com")
    await page.locator("#userPassword").fill("Carlos9.com")
    await page.locator("[value='Login']").click()
    await page.locator(".card-body b").first().waitFor()

    await context.storageState({path: 'state.json'})
    webContext = await browser.newContext({storageState:'state.json'})
})

test.only('Browser context validation error login 2', async()=>
{   
    const productName = 'ZARA COAT 3'
    const page = await webContext.newPage()
    await page.goto("https://rahulshettyacademy.com/client")
    const products = page.locator('.card-body')
    //await page.waitForLoadState("networkidle") // No continúo hasta que la página deje de hacer llamadas a la red” | Esperar hasta que no haya solicitudes http en progreso
     // Espera a que el elemento esté presente en el DOM, sin importar su estado de visibilidad
    const titles = await page.locator(".card-body b").allTextContents() // esto hace que
    console.log(titles)
    const count = await products.count()
    for(let i=0; i<count; i++){
        if (await products.nth(i).locator('b').textContent() === productName){
            await products.nth(i).locator("text= Add To Cart").click()
            break
        }
    }
    await page.locator("[routerLink*='cart']").click()
    await page.locator('div li').first().waitFor()
    const bool =  await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
    await expect(bool).toBeTruthy()
    await page.locator("text=Checkout").click()
    //await page.locator("[placeholder*='Country']").fill("ind")
    await page.locator("[placeholder*='Country']").pressSequentially("ind")
    const dropdown = page.locator(".ta-results")
    await dropdown.waitFor()
    const optionsCount = await dropdown.locator("button").count()
    for(let i=0; i<optionsCount; i++){
        const text = await dropdown.locator("button").nth(i).textContent()
        if (text.trim() === "India"){
            await dropdown.locator("button").nth(i).click()
            break
        }
    }
    const email = 'carlos9cubas@gmail.com'
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email)
    await page.locator('.action__submit').click()
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ')
    //imprimir id
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    console.log(orderId)
    await page.locator("button[routerLink*='myorders']").click()
    //validar orden registrar en orders
    await page.locator("tbody tr").first().waitFor()
    const rows = await page.locator("tbody tr")
    for(let i=0; i< await rows.count(); i++){
        const rowOrderId = await rows.nth(i).locator("th").textContent()
        if (orderId.includes(rowOrderId)){
            console.log('Si contiene')
            await rows.nth(i).locator("button").first().click()
            break
        }else{
            console.log('NO contiene')
        }
    }
    const orderIdDetails = await page.locator(".col-text").first().textContent()
    expect(orderId.includes(orderIdDetails)).toBeTruthy()
});

test.only('Browser context validation error login 3', async()=>
{   
    const productName = 'ZARA COAT 3'
    const page = await webContext.newPage()
    await page.goto("https://rahulshettyacademy.com/client")
    const products = page.locator('.card-body')
    //await page.waitForLoadState("networkidle") // No continúo hasta que la página deje de hacer llamadas a la red” | Esperar hasta que no haya solicitudes http en progreso
     // Espera a que el elemento esté presente en el DOM, sin importar su estado de visibilidad
    const titles = await page.locator(".card-body b").allTextContents() // esto hace que
    console.log(titles)

});