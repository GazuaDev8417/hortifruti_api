import ConnectToDatabase from "../data/Connexion"



export default class Cart extends ConnectToDatabase{
    protected CART_TABLE = 'cart'

    constructor(
        private id:string,
        private product:string,
        private price:string,
        private client:string,
        private urlImage:string
    ){ super() }

    save = async()=>{
        try{
            await ConnectToDatabase.con(this.CART_TABLE).insert({
                id: this.id,
                product: this.product,
                price: this.price,
                client: this.client,
                urlImage: this.urlImage
            })
        }catch(e){
            throw new Error(`Erro ao adicionar no carrinho: ${e}`)
        }
    }
}