import ConnectToDatabase from "./Connexion"
import Product from "../models/Product"
import Cart from "../models/Cart"
import { ProductModel, CartModel } from "../models/Types"




export default class ProductData extends ConnectToDatabase{
    protected PRODUCT_TABLE = 'products'
    protected CART_TABLE = 'cart'

    insertProduct = async(product:Product):Promise<void>=>{
        try{

            await product.save()

        }catch(e:any){
            throw new Error(`Erro ao registrar produto: ${e}`)
        }
    }


    findByName = async(product:string):Promise<ProductModel>=>{
        try{

            const [prd] = await ConnectToDatabase.con(this.PRODUCT_TABLE).where({ product })

            return prd
        }catch(e:any){
            throw new Error(`Erro ao buscar produto: ${e}`)
        }
    }


    getProducts = async():Promise<ProductModel[]>=>{
        try{

            const products = await ConnectToDatabase.con(this.PRODUCT_TABLE)

            return products
        }catch(e:any){
            throw new Error(`Erro ao buscar produtos: ${e}`)
        }
    }


    insertInCart = async(cart:Cart):Promise<void>=>{
        try{

            await cart.save()

        }catch(e:any){
            throw new Error(`Erro ao adicionar no carrinho: ${e}`)
        }
    }


    getCartItems = async():Promise<CartModel[]>=>{
        try{

            const cartItems = await ConnectToDatabase.con(this.CART_TABLE)

            return cartItems
        }catch(e:any){
            throw new Error(`Erro ao buscar itens: ${e}`)
        }
    }


    removeCartItem = async(id:string):Promise<void>=>{
        try{

            await ConnectToDatabase.con(this.CART_TABLE).del().where({ id })

        }catch(e:any){
            throw new Error(`Erro ao remover itens: ${e}`)
        }
    }
}