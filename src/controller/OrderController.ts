import { Request, Response } from "express"
import OrderBusiness from "../business/OrderBusiness"




export default class OrderController{
    constructor(
        private orderBusiness:OrderBusiness
    ){}


    createOrder = async(req:Request, res:Response):Promise<void>=>{
        try{

            await this.orderBusiness.createOrder(req)

            res.status(201).send('Pedido registrado com sucesso')
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    getOrdersByClient = async(req:Request, res:Response):Promise<void>=>{
        try{

            const orders = await this.orderBusiness.getOrdersByClient(req)

            res.status(201).send(orders)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }
}