Feature: Placing validations

    @RegresionTest00 @preLogin
    Scenario: Placing the Order
        Given a login to ecomerce application with "carlos9cubas@gmail.com" and "Carlos9.com"
        When add "ZARA COAT 3" to cart
        And verify "ZARA COAT 3" is displayed in the cart
        And enter valid details and place the order
        Then verify order in preset in the order History

    @RegresionTest2 @preLogin
    Scenario Outline: Placing the Order 3
        Given a login to ecomerce application with "carlos9cubas@gmail.com" and "Carlos9.com"
        When add "ZARA COAT 3" to cart
        And verify "ZARA COAT 3" is displayed in the cart
        Examples:
            | username               | password    | product     |
            | carlos9cubas@gmail.com | Carlos9.com | ZARA COAT 3 |
            | carlos9cubas@gmail.com | Carlos9.com | ZARA COAT 3 |
            | carlos9cubas@gmail.com | Carlos9.com | ZARA COAT 3 |
