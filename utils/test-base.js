const base  = require('@playwright/test')

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            userName: "carlos9cubas@gmail.com",
            password: "Carlos9.com",
            productName: "ZARA COAT 3"
        }
    }
)