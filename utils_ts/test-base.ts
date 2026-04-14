import {test as baseTest} from '@playwright/test'

interface TestDataForOrder {
    userName: string;
    password: string;
    productName: string;
}

export const customtest = baseTest.extend<{testDataForOrder: TestDataForOrder}>(
    {
        testDataForOrder: {
            userName: "carlos9cubas@gmail.com",
            password: "Carlos9.com",
            productName: "ZARA COAT 3"
        }
    }
)