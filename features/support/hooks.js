const playwright = require('@playwright/test')
const { POManager } = require('../../pageobject/POManager');
const { Before, After, AfterStep, Status } = require('@cucumber/cucumber')


Before({tags: "@preLogin"},async function () { // se peude definir deterinados hooks para determinados escenarios de prueba que contengan dichos tags  tmbn aplica el or y el and
    const browser = await playwright.chromium.launch(
        { headless: false }
    )
    const context = await browser.newContext()
    this.page = await context.newPage()
    this.poManager = new POManager(this.page)
})

After(async function () {
    console.log('I am last to execute')
})

AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenShot1.png' })
    }
})
