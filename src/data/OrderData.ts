import ConnectToDatabase from "./Connexion"
import Order from "../models/Order"
import { OrderModel } from "../models/Types"



export default class OrderData extends ConnectToDatabase{
    protected ORDER_TABLE = 'orders'

    createOrder = async(order:Order):Promise<void>=>{
        try{

            await order.save()

        }catch(e:any){
            throw new Error(`Error ao registrar pedido: ${e}`)
        }
    }


    findOrder = async(
        client:string, email:string, phone:string, address:string, product:string, quantity:string, clientId:string
    ):Promise<OrderModel>=>{
        try{

            const [order] = await ConnectToDatabase.con(this.ORDER_TABLE).where({
                client, email, phone, address, product, quantity, clientId
            })

            return order
        }catch(e:any){
            throw new Error(`Erro ao buscar pedido: ${e}`)
        }
    }


    getOrdersByClient = async(clientId:string):Promise<OrderModel[]>=>{
        try{

            const orders = await ConnectToDatabase.con(this.ORDER_TABLE).where({ clientId })

            return orders
        }catch(e:any){
            throw new Error(`Erro ao buscar pedidos: ${e}`)
        }
    }
}