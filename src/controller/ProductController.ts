import { Request, Response } from "express"
import ProductBusiness from "../business/ProductBusiness"



export default class ProductController{
    constructor(
        private productBusiness:ProductBusiness
    ){}


    insertProduct = async(req:Request, res:Response):Promise<void>=>{
        try{

            await this.productBusiness.insertProduct(req)

            res.status(201).send('Produto registrado')
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }

    getProducts = async(req:Request, res:Response):Promise<void>=>{
        try{

            const products = await this.productBusiness.getProducts(req)

            res.status(200).send(products)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    insertInCart = async(req:Request, res:Response):Promise<void>=>{
        try{

            await this.productBusiness.insertInCart(req)

            res.status(200).send(`${req.body.product} adicionado ao carrinho`)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    getCartItems = async(req:Request, res:Response):Promise<void>=>{
        try{

            const cartItems = await this.productBusiness.getCartItems(req)

            res.status(200).send(cartItems)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }
}