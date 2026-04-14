 
const {test, expect} = require('@playwright/test')

//test.describe.configure({mode: 'parallel'})
test('@web PopUp validations', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(page.locator('#displayed-text')).toBeVisible()
    await page.locator('#displayed-text').screenshot({path: 'partialScreenShoot.png'})
    await page.locator('#hide-textbox').click()
    await page.screenshot({path: 'screenshot.png'})
    await expect(page.locator('#displayed-text')).toBeHidden()
 });

 test('PopUp validations 2 para prueba paralela - borrar', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(page.locator('#displayed-text')).toBeVisible()
    await page.locator('#displayed-text').screenshot({path: 'partialScreenShoot.png'})
    await page.locator('#hide-textbox').click()
    await page.screenshot({path: 'screenshot.png'})
    await expect(page.locator('#displayed-text')).toBeHidden()

 });

test('@visual Visual testing', async({page})=>{
    await page.goto('https://www.google.com/')
    expect(await page.screenshot()).toMatchSnapshot('landing.png')
 });