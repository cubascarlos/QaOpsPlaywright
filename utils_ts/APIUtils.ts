export class APIUtils{

    apiContext: any
    loginPayLoad: string

    constructor(apiContext: any, loginPayLoad: string){
        this.apiContext = apiContext
        this.loginPayLoad = loginPayLoad
    }

    async getToken(){
        const loginResponse:any = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: this.loginPayLoad
        })
        //expect(loginResponse.ok()).toBeTruthy()
        const loginResponseJson = await loginResponse.json()
        const token = loginResponseJson.token
        console.log(token)
        return token
    }

    async createOrder(orderPayLoad: any){
        let response = {token: String, orderId: String}
        response.token = await this.getToken()
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            },
        })
        //expect(orderResponse.ok()).toBeTruthy()
        const orderResponseJson = await orderResponse.json()
        const orderId = orderResponseJson.orders[0]
        response.orderId = orderId
        console.log(response.orderId)
    return response
    }
}