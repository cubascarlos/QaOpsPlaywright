
const {test, expect} = require('@playwright/test')


test.only('Calendar validations', async({page})=>{
    const monthNumber = "6"
    const date = "15"
    const year = "2027"
    const expectedList = [monthNumber, date, year]

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers')
    //page.getByRole('link', {name: 'Top Deals'}).click()
    await page.locator('.react-date-picker__inputGroup').click()
    await page.locator('.react-calendar__navigation__label').click()
    await page.locator('.react-calendar__navigation__label').click()
    await page.getByText(year).click()
    //await page.pause()
    await page.locator('.react-calendar__tile').nth(Number(monthNumber)-1).click()
    await page.locator('//abbr[text()="'+date+'"]').click()
    const inputs = page.locator('.react-date-picker__inputGroup__input')
    for(let i = 0; i < expectedList.length; i++){
        const input = await inputs.nth(i).inputValue()
        console.log(input)
        expect(input).toEqual(expectedList[i])
    }
});


test("Calendar validations2",async({page})=>{
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];
    
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
 
    const inputs =  page.locator('.react-date-picker__inputGroup__input')
 
    for(let i =0; i<expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }
 });