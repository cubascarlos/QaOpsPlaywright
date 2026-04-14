const {test, expect} = require('@playwright/test');

test.only('Browser context Playwright Test', async({browser})=>
{   
    //CREACION DE INSTANCIA NAVEGADOR
    const context = await browser.newContext() // abre un navegador fresco, nuevo, nueva instancia | // crea un contexto, una sesion limpia o configurada(cache o cookies)
    const page = await context.newPage(); // crea una pagina nueva, una pestaña nueva
    //LOCATORS
    const inputUserName = page.locator('#username')
    const inputPassword = page.locator('[type="password"]')
    const btnSignIn = page.locator("#signInBtn")
    const cardTitles = page.locator(".card-body a")
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

test('First Playwright Test', async({page})=>
{
    await page.goto("https://google.com")
    console.log(await page.title())
    await expect(page).toHaveTitle("Google")

});

test('Second Playwright Test', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const inputUserName = page.locator('#username')
    const inputPassword = page.locator('[type="password"]')
    const dropdown = page.locator('select.form-control')

    await inputUserName.fill('rahulshettyacademy')
    await inputPassword.fill('Learning@830$3mK2')
    await dropdown.selectOption("consult")
    await page.locator(".radiotextsty").last().click()
    await page.locator('#okayBtn').click()
    await expect(page.locator('.radiotextsty').last()).toBeChecked()
    console.log(await page.locator('.radiotextsty').last().isChecked())

    await page.locator('#terms').check()
    await expect(page.locator('#terms')).toBeChecked()
    await page.locator('#terms').uncheck()
    await page.pause() 
    expect(await page.locator('#terms').isChecked()).toBeFalsy()

    await page.pause() //debbuging
});

test('Child Windows Handled Test', async({browser})=>
{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    
    //await page.locator(".blinkingText").click()
    //const page2 = await context.waitForEvent('page')

     const [newPage]= await Promise.all([ //se tiene que hacer en paralelo
        context.waitForEvent('page'),
        page.locator(".blinkingText").click(),
    ]);
    await page.pause()
    const text = await newPage.locator(".red").textContent()
    //console.log(text)
    const userEmail = text.split("@")[1].split(" ")[0]
    console.log('hola-------1')
    console.log(userEmail)

    const inputUserName = page.locator('#username')
    await inputUserName.fill(userEmail)
    console.log('hola-------2')
    console.log(await inputUserName.inputValue())
    //await page.pause()
});