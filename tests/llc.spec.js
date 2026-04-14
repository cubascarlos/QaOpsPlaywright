const {test, expect} = require('@playwright/test')


test.only('Playwright Special Locators', async({page})=>
{   
    const products = page.locator('.card-body')
    await page.goto("https://rahulshettyacademy.com/angularpractice")
    await page.getByLabel('Check me out if you Love IceCreams!').check()
    await page.getByLabel('Employed').click()
    await page.getByPlaceholder('Password').fill('Carlos')
    await page.getByLabel('Gender').selectOption('Female')
    
    await page.getByRole('button', {name: 'Submit'}).click()
    const bool = await page.getByText('Success! The Form has been submitted successfully!.').isVisible()
    await page.getByRole('Link', {name: 'Shop'}).click()
    await page.locator('app-card').filter({hasText: 'iphone X'}).getByRole('button', {name: 'Add '}).click()
});



// para ejecutar apuntando a un archivo de configuracion especifico: npx playwright test ClientAppPO.spec.js --config playwright.config1.js
// para ejecutar modo debug se debe ingresar el comando de ejecucion de la prueba en package.json y luego comand shift p Debug npm script
// para ejecutar modo ui: npx playwright test --ui
// para abrir el trace es en la web:  https://trace.playwright.dev/ ó npx playwright show-trace trace.zip
// cuando se crea un project en el playwright.config el comando es npx playwright test ClientAppPO.spec.js --project safari execution
// --greep para desencadenar pruebas por etiqueta en el titulo --grep @web 
// instalar allure: npm install -D allure-playwright - npx playwright test --grep @web --reporter=line,allure-playwright -  npx allure generate --clean ./allure-results - npx allure open ./allure-report - para que funcione allure sin npx debe instalar brew install allure ---- primero probar con npm I -D @playwright/test allure-playwright
// Para ejecutar custom script en el archivo package.json se debe ejecutar el comando npm run webTests
// Inicar Jenkins: jenkins % java -jar jenkins.war -httpPort=9090
// Hay que isntalar globalmente Ts para que reconozca el uso del comando tsc directamente npm install -g typescript
// Convertir a JS tsc demo1.ts un TS file
// npm install @cucumber/cucumber
// npx cucumber-js --exit
// para ejecutar casos en cucumber sin runner: npx cucumber-js features/Ecomerce.feature --exit   y si no se da el archivo feature especifico ejecuta todos los features
// Ejecutar con tags: npx cucumber-js --tags="@RegresionTest" --exit
// En cucumber no se puede ejecutar features en paralelo, pero si scenarios en paralelo dentro de un feature: npx cucumber-js features/Ecomerce2.feature --parallel 3 --exit
// Para generar informe html cucumber: npx cucumber-js features/Ecomerce2.feature --parallel 3 --exit --format html:cucumber-report.html
// Para reintentos: npx cucumber-js --tags @SmokeTest --retry 1  --exit --format html:cucumber-report.html
//
//
