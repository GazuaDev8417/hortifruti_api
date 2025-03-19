import { Request } from "express"
import ProductData from "../data/ProductData"
import { CartModel, ProductModel } from "../models/Types"
import Product from "../models/Product"
import Cart from "../models/Cart"
import Services from "../services/Authorization"




export default class ProductBusiness{
    constructor(
        private productData:ProductData
    ){}

    insertProduct = async(req:Request):Promise<void>=>{
        const { product, price } = req.body

        if(!product || !price){
            throw new Error('Preencha os campos')
        }

        const registeredProduct = await this.productData.findByName(product)
        if(registeredProduct){
            throw{
                statusCode: 401,
                error: new Error('Produto já registrado')
            }
        }

        const id = new Services().idGenerator()

        const prod = new Product(id , product, price)

        await this.productData.insertProduct(prod)
    }


    getProducts = async(req:Request):Promise<ProductModel[]>=>{
        const products = await this.productData.getProducts()

        return products
    }


    insertInCart = async(req:Request):Promise<void>=>{
        const user = await new Services().authToken(req)
        const { product, price, urlImage } = req.body

        if(!product || !price){
            throw{
                statusCode: 401,
                error: new Error('Preencha os campos')
            }
        }

        const id = new Services().idGenerator()
        const cart = new Cart(id, product, price, user.id, urlImage)

        await this.productData.insertInCart(cart)

    }


    getCartItems = async(req:Request):Promise<CartModel[]>=>{
        const user = await new Services().authToken(req)

        const cartItems = await this.productData.getCartItems(user.id)

        if(cartItems.length === 0){
            throw{
                statusCode: 404,
                error: new Error('Seu carrinho está vázio')
            }
        }

        return cartItems
    }


    removeCartItems = async(req:Request):Promise<void>=>{
        await new Services().authToken(req)

        await this.productData.removeCartItem(req.params.id)
    }
}
