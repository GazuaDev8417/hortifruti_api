import { Request } from "express"
import Order from "../models/Order"
import OrderData from "../data/OrderData"
import Services from "../services/Authorization"




export default class OrderBusiness{
    constructor(
        private orderData:OrderData
    ){}


    createOrder = async(req:Request):Promise<void>=>{
        const user = await new Services().authToken(req)
        
        const { client, email, phone, address, product, quantity } = req.body

        if(!client || !email || !phone || !address || !product || !quantity){
            throw{
                statusCode: 401,
                error: new Error('Preencha todos os campos')
            }
        }

        const existingOrder = await this.orderData.findOrder(
            client, email, phone, address, product, quantity, user.id
        )
        if(existingOrder){
            throw{
                statusCode: 401,
                error: new Error('Pedido já registrado')
            }
        }

        const id = new Services().idGenerator()

        const order = new Order(
            id,
            client,
            email,
            phone,
            address,
            product,
            quantity,
            user.id
        )

        await this.orderData.createOrder(order)
    }
}